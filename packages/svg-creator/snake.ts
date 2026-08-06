import { getHeadX, getHeadY } from "@snk/types/snake";
import type { Snake } from "@snk/types/snake";
import type { Point } from "@snk/types/point";
import { h } from "./xml-utils";
import { createAnimation } from "./css-utils";

export type Options = {
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
};

const lerp = (k: number, a: number, b: number) => (1 - k) * a + k * b;

export const createSnake = (
  chain: Snake[],
  { sizeCell, sizeDot }: Options,
  duration: number,
  /**
   * Instante normalizado (0..1) de cada celula comida, em ordem crescente.
   * Sem isso a cobra aparece inteira desde o inicio, como no upstream.
   */
  eatenTimes: number[] = [],
  /**
   * Comprimento VISUAL, independente do comprimento que o solver usou.
   * O solver custa caro com cobra longa (medido: 4 = 11s, 5 = 56s, 6 > 4min),
   * entao a rota e sempre calculada com 4 e o corpo desenhado e maior.
   */
  visualN = 12,
) => {
  // Rastro da cabeca: posicao dela em cada passo. O corpo de uma cobra e
  // exatamente esse rastro atrasado — segmento i no passo t esta onde a cabeca
  // estava em t-i. Por isso da para desenhar mais segmentos do que o solver
  // considerou, sem recalcular rota.
  const headTrail: Point[] = chain.map((s) => ({
    x: getHeadX(s),
    y: getHeadY(s),
  }));

  const snakeParts: Point[][] = Array.from({ length: visualN }, (_, i) =>
    headTrail.map((_, t) => headTrail[Math.max(0, t - i)]),
  );

  // Nota medida: com visualN=12 sobre a rota de uma cobra de 4, ~7% dos passos
  // tem dois segmentos na mesma celula (a cabeca revisitou a celula em menos de
  // 12 passos). Como todos os segmentos tem a mesma cor, isso aparece como
  // cauda momentaneamente mais curta, nao como defeito.

  const svgElements = snakeParts.map((_, i, { length }) => {
    // compute snake part size
    const dMin = sizeDot * 0.8;
    const dMax = sizeCell * 0.9;
    // Afinamento ao longo da cobra INTEIRA. O upstream usa min(4, length),
    // que numa cobra longa deixa tudo do 5o segmento em diante no tamanho
    // minimo — vira um fio. Com iMax = length o afunilamento e gradual.
    const iMax = length;
    const u = (1 - Math.min(i, iMax) / iMax) ** 2;
    const s = lerp(u, dMin, dMax);

    const m = (sizeCell - s) / 2;

    const r = Math.min(4.5, (4 * s) / sizeDot);

    return h("rect", {
      class: `s s${i}`,
      x: m.toFixed(1),
      y: m.toFixed(1),
      width: s.toFixed(1),
      height: s.toFixed(1),
      rx: r.toFixed(1),
      ry: r.toFixed(1),
    });
  });

  const transform = ({ x, y }: Point) =>
    `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;

  const styles = [
    `.s{ 
      shape-rendering: geometricPrecision;
      fill: var(--cs);
      animation: none linear ${duration}ms infinite
    }`,

    ...snakeParts.map((positions, i) => {
      const id = `s${i}`;
      const animationName = id;

      const keyframes = removeInterpolatedPositions(
        positions.map((tr, i, { length }) => ({ ...tr, t: i / length })),
      ).map(({ t, ...p }) => ({ t, style: transform(p) }));

      // Crescimento: o segmento i so aparece depois da i-esima refeicao.
      // A cabeca (i=0) nasce visivel. Se a pessoa comeu menos celulas do que o
      // comprimento da cobra, os segmentos restantes nao aparecem — a cobra
      // termina menor, o que e o comportamento honesto.
      const revealAt = i === 0 ? 0 : eatenTimes[i - 1];
      const grows = revealAt !== undefined && revealAt > 0;

      if (!grows)
        return [
          createAnimation(animationName, keyframes),
          `.s.${id}{
            ${transform(positions[0])};
            animation-name: ${animationName}
          }`,
        ];

      const growName = `g${i}`;
      // Degrau, nao fade: o segmento surge junto com a mordida.
      const growKeyframes = [
        { t: 0, style: "opacity:0" },
        { t: revealAt, style: "opacity:0" },
        { t: Math.min(revealAt + 0.001, 1), style: "opacity:1" },
        { t: 1, style: "opacity:1" },
      ];

      return [
        createAnimation(animationName, keyframes),
        createAnimation(growName, growKeyframes),

        // Duas animacoes no mesmo rect. A duracao vem do `.s` com um unico
        // valor, que o CSS repete para os dois nomes — mesma volta, sincronizado.
        `.s.${id}{
          ${transform(positions[0])};
          opacity: 0;
          animation-name: ${animationName}, ${growName}
        }`,
      ];
    }),
  ].flat();

  return { svgElements, styles };
};

const removeInterpolatedPositions = <T extends Point>(arr: T[]) =>
  arr.filter((u, i, arr) => {
    if (i - 1 < 0 || i + 1 >= arr.length) return true;

    const a = arr[i - 1];
    const b = arr[i + 1];

    const ex = (a.x + b.x) / 2;
    const ey = (a.y + b.y) / 2;

    // return true;
    return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
  });
