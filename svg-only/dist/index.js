"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// packages/types/grid.ts
var isInside, isInsideLarge, copyGrid, getIndex, getColor, isEmpty, setColor, setColorEmpty, createEmptyGrid;
var init_grid = __esm({
  "packages/types/grid.ts"() {
    "use strict";
    isInside = (grid, x, y) => x >= 0 && y >= 0 && x < grid.width && y < grid.height;
    isInsideLarge = (grid, m, x, y) => x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;
    copyGrid = ({ width, height, data }) => ({
      width,
      height,
      data: Uint8Array.from(data)
    });
    getIndex = (grid, x, y) => x * grid.height + y;
    getColor = (grid, x, y) => grid.data[getIndex(grid, x, y)];
    isEmpty = (color) => color === 0;
    setColor = (grid, x, y, color) => {
      grid.data[getIndex(grid, x, y)] = color || 0;
    };
    setColorEmpty = (grid, x, y) => {
      setColor(grid, x, y, 0);
    };
    createEmptyGrid = (width, height) => ({
      width,
      height,
      data: new Uint8Array(width * height)
    });
  }
});

// packages/types/snake.ts
var getHeadX, getHeadY, getSnakeLength, snakeEquals, nextSnake, snakeWillSelfCollide, snakeToCells, createSnakeFromCells;
var init_snake = __esm({
  "packages/types/snake.ts"() {
    "use strict";
    getHeadX = (snake) => snake[0] - 2;
    getHeadY = (snake) => snake[1] - 2;
    getSnakeLength = (snake) => snake.length / 2;
    snakeEquals = (a, b) => {
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
      return true;
    };
    nextSnake = (snake, dx, dy) => {
      const copy = new Uint8Array(snake.length);
      for (let i = 2; i < snake.length; i++) copy[i] = snake[i - 2];
      copy[0] = snake[0] + dx;
      copy[1] = snake[1] + dy;
      return copy;
    };
    snakeWillSelfCollide = (snake, dx, dy) => {
      const nx = snake[0] + dx;
      const ny = snake[1] + dy;
      for (let i = 2; i < snake.length - 2; i += 2)
        if (snake[i + 0] === nx && snake[i + 1] === ny) return true;
      return false;
    };
    snakeToCells = (snake) => Array.from({ length: snake.length / 2 }, (_, i) => ({
      x: snake[i * 2 + 0] - 2,
      y: snake[i * 2 + 1] - 2
    }));
    createSnakeFromCells = (points) => {
      const snake = new Uint8Array(points.length * 2);
      for (let i = points.length; i--; ) {
        snake[i * 2 + 0] = points[i].x + 2;
        snake[i * 2 + 1] = points[i].y + 2;
      }
      return snake;
    };
  }
});

// packages/svg-creator/xml-utils.ts
var h, toAttribute;
var init_xml_utils = __esm({
  "packages/svg-creator/xml-utils.ts"() {
    "use strict";
    h = (element, attributes) => `<${element} ${toAttribute(attributes)}/>`;
    toAttribute = (o) => Object.entries(o).filter(([, value]) => value !== null).map(([name, value]) => `${name}="${value}"`).join(" ");
  }
});

// packages/svg-creator/css-utils.ts
var percent, mergeKeyFrames, createAnimation, minifyCss;
var init_css_utils = __esm({
  "packages/svg-creator/css-utils.ts"() {
    "use strict";
    percent = (x) => parseFloat((x * 100).toFixed(2)).toString() + "%";
    mergeKeyFrames = (keyframes) => {
      const s = /* @__PURE__ */ new Map();
      for (const { t, style } of keyframes) {
        s.set(style, [...s.get(style) ?? [], t]);
      }
      return Array.from(s.entries()).map(([style, ts]) => ({ style, ts })).sort((a, b) => a.ts[0] - b.ts[0]);
    };
    createAnimation = (name, keyframes) => `@keyframes ${name}{` + mergeKeyFrames(keyframes).map(({ style, ts }) => ts.map(percent).join(",") + `{${style}}`).join("") + "}";
    minifyCss = (css) => css.replace(/\s+/g, " ").replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, "")).replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, "")).replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, "")).replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, "")).replace(/\;\s*\}/g, "}").trim();
  }
});

// packages/svg-creator/snake.ts
var lerp, createSnake, removeInterpolatedPositions;
var init_snake2 = __esm({
  "packages/svg-creator/snake.ts"() {
    "use strict";
    init_snake();
    init_xml_utils();
    init_css_utils();
    lerp = (k, a, b) => (1 - k) * a + k * b;
    createSnake = (chain, { sizeCell, sizeDot }, duration, eatenTimes = [], visualN = 12) => {
      const headTrail = chain.map((s) => ({
        x: getHeadX(s),
        y: getHeadY(s)
      }));
      const snakeParts = Array.from(
        { length: visualN },
        (_, i) => headTrail.map((_2, t) => headTrail[Math.max(0, t - i)])
      );
      const svgElements = snakeParts.map((_, i, { length }) => {
        const dMin = sizeDot * 0.8;
        const dMax = sizeCell * 0.9;
        const iMax = length;
        const u = (1 - Math.min(i, iMax) / iMax) ** 2;
        const s = lerp(u, dMin, dMax);
        const m = (sizeCell - s) / 2;
        const r = Math.min(4.5, 4 * s / sizeDot);
        return h("rect", {
          class: `s s${i}`,
          x: m.toFixed(1),
          y: m.toFixed(1),
          width: s.toFixed(1),
          height: s.toFixed(1),
          rx: r.toFixed(1),
          ry: r.toFixed(1)
        });
      });
      const transform = ({ x, y }) => `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;
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
            positions.map((tr, i2, { length }) => ({ ...tr, t: i2 / length }))
          ).map(({ t, ...p }) => ({ t, style: transform(p) }));
          const revealAt = i === 0 ? 0 : eatenTimes[i - 1];
          const grows = revealAt !== void 0 && revealAt > 0;
          if (!grows)
            return [
              createAnimation(animationName, keyframes),
              `.s.${id}{
            ${transform(positions[0])};
            animation-name: ${animationName}
          }`
            ];
          const growName = `g${i}`;
          const growKeyframes = [
            { t: 0, style: "opacity:0" },
            { t: revealAt, style: "opacity:0" },
            { t: Math.min(revealAt + 1e-3, 1), style: "opacity:1" },
            { t: 1, style: "opacity:1" }
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
        }`
          ];
        })
      ].flat();
      return { svgElements, styles };
    };
    removeInterpolatedPositions = (arr) => arr.filter((u, i, arr2) => {
      if (i - 1 < 0 || i + 1 >= arr2.length) return true;
      const a = arr2[i - 1];
      const b = arr2[i + 1];
      const ex = (a.x + b.x) / 2;
      const ey = (a.y + b.y) / 2;
      return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
    });
  }
});

// packages/svg-creator/grid.ts
var createGrid;
var init_grid2 = __esm({
  "packages/svg-creator/grid.ts"() {
    "use strict";
    init_css_utils();
    init_xml_utils();
    createGrid = (cells, { sizeDotBorderRadius, sizeDot, sizeCell }, duration) => {
      const svgElements = [];
      const styles = [
        `.c{
      shape-rendering: geometricPrecision;
      fill: var(--ce);
      stroke-width: 1px;
      stroke: var(--cb);
      animation: none ${duration}ms linear infinite;
      width: ${sizeDot}px;
      height: ${sizeDot}px;
    }`
      ];
      let i = 0;
      for (const { x, y, color, t } of cells) {
        const id = t && "c" + (i++).toString(36);
        const m = (sizeCell - sizeDot) / 2;
        if (t !== null && id) {
          const animationName = id;
          styles.push(
            createAnimation(animationName, [
              { t: t - 1e-4, style: `fill:var(--c${color})` },
              { t: t + 1e-4, style: `fill:var(--ce)` },
              { t: 1, style: `fill:var(--ce)` }
            ]),
            `.c.${id}{
          fill: var(--c${color});
          animation-name: ${animationName}
        }`
          );
        }
        svgElements.push(
          h("rect", {
            class: ["c", id].filter(Boolean).join(" "),
            x: x * sizeCell + m,
            y: y * sizeCell + m,
            rx: sizeDotBorderRadius,
            ry: sizeDotBorderRadius
          })
        );
      }
      return { svgElements, styles };
    };
  }
});

// packages/svg-creator/stack.ts
var createStack;
var init_stack = __esm({
  "packages/svg-creator/stack.ts"() {
    "use strict";
    init_css_utils();
    init_xml_utils();
    createStack = (cells, { sizeDot }, width, y, duration) => {
      const svgElements = [];
      const styles = [
        `.u{ 
      transform-origin: 0 0;
      transform: scale(0,1);
      animation: none linear ${duration}ms infinite;
    }`
      ];
      const stack = cells.slice().filter((a) => a.t !== null).sort((a, b) => a.t - b.t);
      const blocks = [];
      stack.forEach(({ color, t }) => {
        const latest = blocks[blocks.length - 1];
        if (latest?.color === color) latest.ts.push(t);
        else blocks.push({ color, ts: [t] });
      });
      const m = width / stack.length;
      let i = 0;
      let nx = 0;
      for (const { color, ts } of blocks) {
        const id = "u" + (i++).toString(36);
        const animationName = id;
        const x = (nx * m).toFixed(1);
        nx += ts.length;
        svgElements.push(
          h("rect", {
            class: `u ${id}`,
            height: sizeDot,
            width: (ts.length * m + 0.6).toFixed(1),
            x,
            y
          })
        );
        styles.push(
          createAnimation(
            animationName,
            [
              ...ts.map((t, i2, { length }) => [
                { scale: i2 / length, t: t - 1e-4 },
                { scale: (i2 + 1) / length, t: t + 1e-4 }
              ]).flat(),
              { scale: 1, t: 1 }
            ].map(({ scale, t }) => ({
              t,
              style: `transform:scale(${scale.toFixed(3)},1)`
            }))
          ),
          `.u.${id} {
        fill: var(--c${color});
        animation-name: ${animationName};
        transform-origin: ${x}px 0
      }
      `
        );
      }
      return { svgElements, styles };
    };
  }
});

// packages/svg-creator/index.ts
var svg_creator_exports = {};
__export(svg_creator_exports, {
  createSvg: () => createSvg
});
var getCellsFromGrid, createLivingCells, createSvg, optimizeCss, optimizeSvg, generateColorVar;
var init_svg_creator = __esm({
  "packages/svg-creator/index.ts"() {
    "use strict";
    init_grid();
    init_snake();
    init_snake2();
    init_grid2();
    init_stack();
    init_xml_utils();
    init_css_utils();
    getCellsFromGrid = ({ width, height }) => Array.from(
      { length: width },
      (_, x) => Array.from({ length: height }, (_2, y) => ({ x, y }))
    ).flat();
    createLivingCells = (grid0, chain, cells) => {
      const livingCells = (cells ?? getCellsFromGrid(grid0)).map(({ x, y }) => ({
        x,
        y,
        t: null,
        color: getColor(grid0, x, y)
      }));
      const grid = copyGrid(grid0);
      for (let i = 0; i < chain.length; i++) {
        const snake = chain[i];
        const x = getHeadX(snake);
        const y = getHeadY(snake);
        if (isInside(grid, x, y) && !isEmpty(getColor(grid, x, y))) {
          setColorEmpty(grid, x, y);
          const cell = livingCells.find((c) => c.x === x && c.y === y);
          cell.t = i / chain.length;
        }
      }
      return livingCells;
    };
    createSvg = (grid, cells, chain, drawOptions, animationOptions) => {
      const width = (grid.width + 2) * drawOptions.sizeCell;
      const height = (grid.height + 5) * drawOptions.sizeCell;
      const duration = animationOptions.stepDurationMs * chain.length;
      const livingCells = createLivingCells(grid, chain, cells);
      const eatenTimes = livingCells.map((c) => c.t).filter((t) => t !== null).sort((a, b) => a - b);
      const elements = [
        createGrid(livingCells, drawOptions, duration),
        createStack(
          livingCells,
          drawOptions,
          grid.width * drawOptions.sizeCell,
          (grid.height + 2) * drawOptions.sizeCell,
          duration
        ),
        createSnake(chain, drawOptions, duration, eatenTimes)
      ];
      const viewBox = [
        -drawOptions.sizeCell,
        -drawOptions.sizeCell * 2,
        width,
        height
      ].join(" ");
      const style = generateColorVar(drawOptions) + elements.map((e) => e.styles).flat().join("\n");
      const svg = [
        h("svg", {
          viewBox,
          width,
          height,
          xmlns: "http://www.w3.org/2000/svg"
        }).replace("/>", ">"),
        "<desc>",
        "Generated with https://github.com/Platane/snk",
        "</desc>",
        "<style>",
        optimizeCss(style),
        "</style>",
        ...elements.map((e) => e.svgElements).flat(),
        "</svg>"
      ].join("");
      return optimizeSvg(svg);
    };
    optimizeCss = (css) => minifyCss(css);
    optimizeSvg = (svg) => svg;
    generateColorVar = (drawOptions) => `
    :root {
    --cb: ${drawOptions.colorDotBorder};
    --cs: ${drawOptions.colorSnake};
    --ce: ${drawOptions.colorEmpty};
    ${Object.entries(drawOptions.colorDots).map(([i, color]) => `--c${i}:${color};`).join("")}
    }
    ` + (drawOptions.dark ? `
    @media (prefers-color-scheme: dark) {
      :root {
        --cb: ${drawOptions.dark.colorDotBorder || drawOptions.colorDotBorder};
        --cs: ${drawOptions.dark.colorSnake || drawOptions.colorSnake};
        --ce: ${drawOptions.dark.colorEmpty};
        ${Object.entries(drawOptions.dark.colorDots).map(([i, color]) => `--c${i}:${color};`).join("")}
      }
    }
` : "");
  }
});

// packages/draw/pathRoundedRect.ts
var pathRoundedRect;
var init_pathRoundedRect = __esm({
  "packages/draw/pathRoundedRect.ts"() {
    "use strict";
    pathRoundedRect = (ctx, width, height, borderRadius) => {
      ctx.moveTo(borderRadius, 0);
      ctx.arcTo(width, 0, width, height, borderRadius);
      ctx.arcTo(width, height, 0, height, borderRadius);
      ctx.arcTo(0, height, 0, 0, borderRadius);
      ctx.arcTo(0, 0, width, 0, borderRadius);
    };
  }
});

// packages/draw/drawGrid.ts
var drawGrid;
var init_drawGrid = __esm({
  "packages/draw/drawGrid.ts"() {
    "use strict";
    init_grid();
    init_pathRoundedRect();
    drawGrid = (ctx, grid, cells, o) => {
      for (let x = grid.width; x--; )
        for (let y = grid.height; y--; ) {
          if (!cells || cells.some((c) => c.x === x && c.y === y)) {
            const c = getColor(grid, x, y);
            const color = !c ? o.colorEmpty : o.colorDots[c];
            ctx.save();
            ctx.translate(
              x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2,
              y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2
            );
            ctx.fillStyle = color;
            ctx.strokeStyle = o.colorDotBorder;
            ctx.lineWidth = 1;
            ctx.beginPath();
            pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeDotBorderRadius);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
          }
        }
    };
  }
});

// packages/draw/drawSnake.ts
var lerp2, clamp, drawSnakeLerp;
var init_drawSnake = __esm({
  "packages/draw/drawSnake.ts"() {
    "use strict";
    init_pathRoundedRect();
    init_snake();
    lerp2 = (k, a, b) => (1 - k) * a + k * b;
    clamp = (x, a, b) => Math.max(a, Math.min(b, x));
    drawSnakeLerp = (ctx, snake0, snake13, k, o) => {
      const m = 0.8;
      const n = snake0.length / 2;
      for (let i = 0; i < n; i++) {
        const u = (i + 1) * 0.6 * (o.sizeCell / 16);
        const a = (1 - m) * (i / Math.max(n - 1, 1));
        const ki = clamp((k - a) / m, 0, 1);
        const x = lerp2(ki, snake0[i * 2 + 0], snake13[i * 2 + 0]) - 2;
        const y = lerp2(ki, snake0[i * 2 + 1], snake13[i * 2 + 1]) - 2;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(x * o.sizeCell + u, y * o.sizeCell + u);
        ctx.beginPath();
        pathRoundedRect(
          ctx,
          o.sizeCell - u * 2,
          o.sizeCell - u * 2,
          (o.sizeCell - u * 2) * 0.25
        );
        ctx.fill();
        ctx.restore();
      }
    };
  }
});

// packages/draw/drawWorld.ts
var drawStack, drawLerpWorld, getCanvasWorldSize;
var init_drawWorld = __esm({
  "packages/draw/drawWorld.ts"() {
    "use strict";
    init_drawGrid();
    init_drawSnake();
    drawStack = (ctx, stack, max, width, o) => {
      ctx.save();
      const m = width / max;
      for (let i = 0; i < stack.length; i++) {
        ctx.fillStyle = o.colorDots[stack[i]];
        ctx.fillRect(i * m, 0, m + width * 5e-3, 10);
      }
      ctx.restore();
    };
    drawLerpWorld = (ctx, grid, cells, snake0, snake13, stack, k, o) => {
      ctx.save();
      if (o.colorBackground) {
        ctx.fillStyle = o.colorBackground;
        ctx.fillRect(0, 0, 99999, 99999);
      }
      ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
      drawGrid(ctx, grid, cells, o);
      drawSnakeLerp(ctx, snake0, snake13, k, o);
      ctx.translate(0, (grid.height + 2) * o.sizeCell);
      const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
      drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
      ctx.restore();
    };
    getCanvasWorldSize = (grid, o) => {
      const width = o.sizeCell * (grid.width + 2);
      const height = o.sizeCell * (grid.height + 4) + 30;
      return { width, height };
    };
  }
});

// packages/solver/step.ts
var step;
var init_step = __esm({
  "packages/solver/step.ts"() {
    "use strict";
    init_grid();
    init_snake();
    step = (grid, stack, snake) => {
      const x = getHeadX(snake);
      const y = getHeadY(snake);
      const color = getColor(grid, x, y);
      if (isInside(grid, x, y) && !isEmpty(color)) {
        stack.push(color);
        setColorEmpty(grid, x, y);
      }
    };
  }
});

// packages/gif-creator/index.ts
var gif_creator_exports = {};
__export(gif_creator_exports, {
  createGif: () => createGif,
  withTmpDir: () => withTmpDir
});
var import_node_child_process, import_node_fs, import_node_os, import_node_path, createGif, withTmpDir;
var init_gif_creator = __esm({
  "packages/gif-creator/index.ts"() {
    "use strict";
    import_node_child_process = require("node:child_process");
    import_node_fs = __toESM(require("node:fs"));
    import_node_os = require("node:os");
    import_node_path = __toESM(require("node:path"));
    init_drawWorld();
    init_step();
    init_grid();
    createGif = async (grid0, cells, chain, drawOptions, animationOptions) => withTmpDir(async (dir) => {
      const { createCanvas } = await import("canvas");
      const { default: gifsicle } = await import("gifsicle");
      const { default: GIFEncoder } = await import("gif-encoder-2");
      const { width, height } = getCanvasWorldSize(grid0, drawOptions);
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d", {
        alpha: true
      });
      const grid = copyGrid(grid0);
      const stack = [];
      const encoder = new GIFEncoder(
        width,
        height,
        "neuquant",
        true,
        chain.length * animationOptions.frameByStep
      );
      encoder.setRepeat(0);
      encoder.setDelay(
        animationOptions.stepDurationMs / animationOptions.frameByStep
      );
      encoder.start();
      for (let i = 0; i < chain.length; i += 1) {
        const snake0 = chain[i];
        const snake13 = chain[Math.min(chain.length - 1, i + 1)];
        step(grid, stack, snake0);
        for (let k = 0; k < animationOptions.frameByStep; k++) {
          ctx.clearRect(0, 0, width, height);
          drawLerpWorld(
            ctx,
            grid,
            cells,
            snake0,
            snake13,
            stack,
            k / animationOptions.frameByStep,
            drawOptions
          );
          encoder.addFrame(ctx);
        }
      }
      const outFileName = import_node_path.default.join(dir, "out.gif");
      const optimizedFileName = import_node_path.default.join(dir, "out.optimized.gif");
      const paletteFileName = import_node_path.default.join(dir, "palette.txt");
      {
        const colors = [
          drawOptions.colorBackground,
          drawOptions.colorEmpty,
          drawOptions.colorSnake,
          drawOptions.colorDotBorder,
          ...Object.values(drawOptions.colorDots)
        ].filter(Boolean);
        const canvas2 = createCanvas(colors.length, 1);
        const ctx2 = canvas2.getContext("2d");
        for (let i = colors.length; i--; ) {
          ctx2.fillStyle = colors[i];
          ctx2.fillRect(i, 0, 1, 1);
        }
        const imgData = ctx2.getImageData(0, 0, colors.length, 1);
        import_node_fs.default.writeFileSync(
          paletteFileName,
          Array.from(
            { length: colors.length },
            (_, i) => [
              imgData.data[i * 4 + 0],
              imgData.data[i * 4 + 1],
              imgData.data[i * 4 + 2]
            ].join(" ")
          ).join("\n")
        );
      }
      encoder.finish();
      import_node_fs.default.writeFileSync(outFileName, encoder.out.getData());
      (0, import_node_child_process.execFileSync)(
        gifsicle,
        [
          //
          "--optimize=3",
          "--color-method=diversity",
          `--use-colormap=${paletteFileName}`,
          // "--colors=16",
          outFileName,
          ["--output", optimizedFileName]
        ].flat()
      );
      return new Uint8Array(import_node_fs.default.readFileSync(optimizedFileName));
    });
    withTmpDir = async (handler) => {
      const dir = import_node_path.default.join((0, import_node_os.tmpdir)(), Math.random().toString(16).slice(2));
      import_node_fs.default.mkdirSync(dir, { recursive: true });
      try {
        return await handler(dir);
      } finally {
        import_node_fs.default.rmdirSync(dir, { recursive: true });
      }
    };
  }
});

// packages/action/index.ts
var fs2 = __toESM(require("node:fs"));
var path2 = __toESM(require("node:path"));

// packages/forgejo-user-contribution/index.ts
var getForgejoUserContribution = async (userName, o = {}) => {
  const baseUrl = o.baseUrl ?? "https://codeberg.org";
  const res = await fetch(`${baseUrl}/api/v1/users/${userName}/heatmap`, {
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  const heatmapData = await res.json();
  const countsByDate = /* @__PURE__ */ new Map();
  for (const { timestamp, contributions } of heatmapData) {
    const date = new Date(timestamp * 1e3).toLocaleDateString("en-CA");
    countsByDate.set(date, (countsByDate.get(date) ?? 0) + contributions);
  }
  const max = Math.max(0, ...countsByDate.values());
  const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 365);
  start.setDate(start.getDate() - start.getDay());
  const cells = [];
  const cursor = new Date(start);
  let x = 0;
  while (cursor <= today) {
    const y = cursor.getDay();
    const date = cursor.toLocaleDateString("en-CA");
    const count = countsByDate.get(date) ?? 0;
    cells.push({ x, y, date, count, level: levelForCount(count) });
    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }
  return cells;
};

// packages/github-user-contribution/index.ts
var getGithubUserContribution = async (userName, o) => {
  const query = (
    /* GraphQL */
    `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                weekday
                date
              }
            }
          }
        }
      }
    }
  `
  );
  const variables = { login: userName };
  const apiUrl = o.baseUrl ? `${o.baseUrl}/api/graphql` : "https://api.github.com/graphql";
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `bearer ${o.githubToken}`,
      "Content-Type": "application/json",
      "User-Agent": "me@platane.me"
    },
    method: "POST",
    body: JSON.stringify({ variables, query })
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  const { data, errors } = await res.json();
  if (errors?.[0]) throw errors[0];
  return data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    ({ contributionDays }, x) => contributionDays.map((d) => ({
      x,
      y: d.weekday,
      date: d.date,
      count: d.contributionCount,
      level: d.contributionLevel === "FOURTH_QUARTILE" && 4 || d.contributionLevel === "THIRD_QUARTILE" && 3 || d.contributionLevel === "SECOND_QUARTILE" && 2 || d.contributionLevel === "FIRST_QUARTILE" && 1 || 0
    }))
  );
};

// packages/gitlab-user-contribution/index.ts
var getGitlabUserContribution = async (userName, o = {}) => {
  const baseUrl = o.baseUrl ?? "https://gitlab.com";
  const res = await fetch(`${baseUrl}/users/${userName}/calendar.json`, {
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  const countsByDate = await res.json();
  const max = Math.max(0, ...Object.values(countsByDate));
  const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 365);
  start.setDate(start.getDate() - start.getDay());
  const cells = [];
  const cursor = new Date(start);
  let x = 0;
  while (cursor <= today) {
    const y = cursor.getDay();
    const date = cursor.toLocaleDateString("en-CA");
    const count = countsByDate[date] ?? 0;
    cells.push({ x, y, date, count, level: levelForCount(count) });
    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }
  return cells;
};

// packages/solver/getBestRoute.ts
init_grid();

// packages/solver/outside.ts
init_grid();

// packages/types/point.ts
var around4 = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 }
];

// packages/solver/outside.ts
var createOutside = (grid, color = 0) => {
  const outside = createEmptyGrid(grid.width, grid.height);
  for (let x = outside.width; x--; )
    for (let y = outside.height; y--; ) setColor(outside, x, y, 1);
  fillOutside(outside, grid, color);
  return outside;
};
var fillOutside = (outside, grid, color = 0) => {
  let changed = true;
  while (changed) {
    changed = false;
    for (let x = outside.width; x--; )
      for (let y = outside.height; y--; )
        if (getColor(grid, x, y) <= color && !isOutside(outside, x, y) && around4.some((a) => isOutside(outside, x + a.x, y + a.y))) {
          changed = true;
          setColorEmpty(outside, x, y);
        }
  }
  return outside;
};
var isOutside = (outside, x, y) => !isInside(outside, x, y) || isEmpty(getColor(outside, x, y));

// packages/solver/clearResidualColoredLayer.ts
init_grid();
init_snake();

// packages/solver/getBestTunnel.ts
init_grid();

// packages/solver/utils/sortPush.ts
var sortPush = (arr, x, sortFn) => {
  let a = 0;
  let b = arr.length;
  if (arr.length === 0 || sortFn(x, arr[a]) <= 0) {
    arr.unshift(x);
    return;
  }
  while (b - a > 1) {
    const e2 = Math.ceil((a + b) / 2);
    const s = sortFn(x, arr[e2]);
    if (s === 0) a = b = e2;
    else if (s > 0) a = e2;
    else b = e2;
  }
  const e = Math.ceil((a + b) / 2);
  arr.splice(e, 0, x);
};

// packages/solver/getBestTunnel.ts
init_snake();

// packages/solver/tunnel.ts
init_grid();
init_snake();
var getTunnelPath = (snake0, tunnel) => {
  const chain = [];
  let snake = snake0;
  for (let i = 1; i < tunnel.length; i++) {
    const dx = tunnel[i].x - getHeadX(snake);
    const dy = tunnel[i].y - getHeadY(snake);
    snake = nextSnake(snake, dx, dy);
    chain.unshift(snake);
  }
  return chain;
};
var isEmptySafe = (grid, x, y) => !isInside(grid, x, y) || isEmpty(getColor(grid, x, y));
var trimTunnelStart = (grid, tunnel) => {
  while (tunnel.length) {
    const { x, y } = tunnel[0];
    if (isEmptySafe(grid, x, y)) tunnel.shift();
    else break;
  }
};
var trimTunnelEnd = (grid, tunnel) => {
  while (tunnel.length) {
    const i = tunnel.length - 1;
    const { x, y } = tunnel[i];
    if (isEmptySafe(grid, x, y) || tunnel.findIndex((p) => p.x === x && p.y === y) < i)
      tunnel.pop();
    else break;
  }
};

// packages/solver/getBestTunnel.ts
var getColorSafe = (grid, x, y) => isInside(grid, x, y) ? getColor(grid, x, y) : 0;
var setEmptySafe = (grid, x, y) => {
  if (isInside(grid, x, y)) setColorEmpty(grid, x, y);
};
var unwrap = (m) => !m ? [] : [...unwrap(m.parent), { x: getHeadX(m.snake), y: getHeadY(m.snake) }];
var getSnakeEscapePath = (grid, outside, snake0, color) => {
  const openList = [{ snake: snake0, w: 0 }];
  const closeList = [];
  while (openList[0]) {
    const o = openList.shift();
    const x = getHeadX(o.snake);
    const y = getHeadY(o.snake);
    if (isOutside(outside, x, y)) return unwrap(o);
    for (const a of around4) {
      const c = getColorSafe(grid, x + a.x, y + a.y);
      if (c <= color && !snakeWillSelfCollide(o.snake, a.x, a.y)) {
        const snake = nextSnake(o.snake, a.x, a.y);
        if (!closeList.some((s0) => snakeEquals(s0, snake))) {
          const w = o.w + 1 + +(c === color) * 1e3;
          sortPush(openList, { snake, w, parent: o }, (a2, b) => a2.w - b.w);
          closeList.push(snake);
        }
      }
    }
  }
  return null;
};
var getBestTunnel = (grid, outside, x, y, color, snakeN) => {
  const c = { x, y };
  const snake0 = createSnakeFromCells(Array.from({ length: snakeN }, () => c));
  const one = getSnakeEscapePath(grid, outside, snake0, color);
  if (!one) return null;
  const snakeICells = one.slice(0, snakeN);
  while (snakeICells.length < snakeN)
    snakeICells.push(snakeICells[snakeICells.length - 1]);
  const snakeI = createSnakeFromCells(snakeICells);
  const gridI = copyGrid(grid);
  for (const { x: x2, y: y2 } of one) setEmptySafe(gridI, x2, y2);
  const two = getSnakeEscapePath(gridI, outside, snakeI, color);
  if (!two) return null;
  one.shift();
  one.reverse();
  one.push(...two);
  trimTunnelStart(grid, one);
  trimTunnelEnd(grid, one);
  return one;
};

// packages/solver/getPathTo.ts
init_grid();
init_snake();
var getPathTo = (grid, snake0, x, y) => {
  const openList = [{ snake: snake0, w: 0 }];
  const closeList = [];
  while (openList.length) {
    const c = openList.shift();
    const cx = getHeadX(c.snake);
    const cy = getHeadY(c.snake);
    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx === x && ny === y) {
        const path3 = [nextSnake(c.snake, dx, dy)];
        let e = c;
        while (e.parent) {
          path3.push(e.snake);
          e = e.parent;
        }
        return path3;
      }
      if (isInsideLarge(grid, 2, nx, ny) && !snakeWillSelfCollide(c.snake, dx, dy) && (!isInside(grid, nx, ny) || isEmpty(getColor(grid, nx, ny)))) {
        const nsnake = nextSnake(c.snake, dx, dy);
        if (!closeList.some((s) => snakeEquals(nsnake, s))) {
          const w = c.w + 1;
          const h2 = Math.abs(nx - x) + Math.abs(ny - y);
          const f = w + h2;
          const o = { snake: nsnake, parent: c, w, h: h2, f };
          sortPush(openList, o, (a, b) => a.f - b.f);
          closeList.push(nsnake);
        }
      }
    }
  }
};

// packages/solver/clearResidualColoredLayer.ts
var clearResidualColoredLayer = (grid, outside, snake0, color) => {
  const snakeN = getSnakeLength(snake0);
  const tunnels = getTunnellablePoints(grid, outside, snakeN, color);
  tunnels.sort((a, b) => b.priority - a.priority);
  const chain = [snake0];
  while (tunnels.length) {
    let t = getNextTunnel(tunnels, chain[0]);
    chain.unshift(...getPathTo(grid, chain[0], t[0].x, t[0].y));
    chain.unshift(...getTunnelPath(chain[0], t));
    for (const { x, y } of t) setEmptySafe2(grid, x, y);
    fillOutside(outside, grid);
    for (let i = tunnels.length; i--; )
      if (isEmpty(getColor(grid, tunnels[i].x, tunnels[i].y)))
        tunnels.splice(i, 1);
      else {
        const t2 = tunnels[i];
        const tunnel = getBestTunnel(grid, outside, t2.x, t2.y, color, snakeN);
        if (!tunnel) tunnels.splice(i, 1);
        else {
          t2.tunnel = tunnel;
          t2.priority = getPriority(grid, color, tunnel);
        }
      }
    tunnels.sort((a, b) => b.priority - a.priority);
  }
  chain.pop();
  return chain;
};
var getNextTunnel = (ts, snake) => {
  let minDistance = Infinity;
  let closestTunnel = null;
  const x = getHeadX(snake);
  const y = getHeadY(snake);
  const priority = ts[0].priority;
  for (let i = 0; ts[i] && ts[i].priority === priority; i++) {
    const t = ts[i].tunnel;
    const d = distanceSq(t[0].x, t[0].y, x, y);
    if (d < minDistance) {
      minDistance = d;
      closestTunnel = t;
    }
  }
  return closestTunnel;
};
var getTunnellablePoints = (grid, outside, snakeN, color) => {
  const points = [];
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);
      if (!isEmpty(c) && c < color) {
        const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
        if (tunnel) {
          const priority = getPriority(grid, color, tunnel);
          points.push({ x, y, priority, tunnel });
        }
      }
    }
  return points;
};
var getPriority = (grid, color, tunnel) => {
  let nColor = 0;
  let nLess = 0;
  for (let i = 0; i < tunnel.length; i++) {
    const { x, y } = tunnel[i];
    const c = getColorSafe2(grid, x, y);
    if (!isEmpty(c) && i === tunnel.findIndex((p) => p.x === x && p.y === y)) {
      if (c === color) nColor += 1;
      else nLess += color - c;
    }
  }
  if (nColor === 0) return 99999;
  return nLess / nColor;
};
var distanceSq = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;
var getColorSafe2 = (grid, x, y) => isInside(grid, x, y) ? getColor(grid, x, y) : 0;
var setEmptySafe2 = (grid, x, y) => {
  if (isInside(grid, x, y)) setColorEmpty(grid, x, y);
};

// packages/solver/clearCleanColoredLayer.ts
init_grid();
init_snake();
var clearCleanColoredLayer = (grid, outside, snake0, color) => {
  const snakeN = getSnakeLength(snake0);
  const points = getTunnellablePoints2(grid, outside, snakeN, color);
  const chain = [snake0];
  while (points.length) {
    const path3 = getPathToNextPoint(grid, chain[0], color, points);
    path3.pop();
    for (const snake of path3)
      setEmptySafe3(grid, getHeadX(snake), getHeadY(snake));
    chain.unshift(...path3);
  }
  fillOutside(outside, grid);
  chain.pop();
  return chain;
};
var unwrap2 = (m) => !m ? [] : [m.snake, ...unwrap2(m.parent)];
var getPathToNextPoint = (grid, snake0, color, points) => {
  const closeList = [];
  const openList = [{ snake: snake0 }];
  while (openList.length) {
    const o = openList.shift();
    const x = getHeadX(o.snake);
    const y = getHeadY(o.snake);
    const i = points.findIndex((p) => p.x === x && p.y === y);
    if (i >= 0) {
      points.splice(i, 1);
      return unwrap2(o);
    }
    for (const { x: dx, y: dy } of around4) {
      if (isInsideLarge(grid, 2, x + dx, y + dy) && !snakeWillSelfCollide(o.snake, dx, dy) && getColorSafe3(grid, x + dx, y + dy) <= color) {
        const snake = nextSnake(o.snake, dx, dy);
        if (!closeList.some((s0) => snakeEquals(s0, snake))) {
          closeList.push(snake);
          openList.push({ snake, parent: o });
        }
      }
    }
  }
};
var getTunnellablePoints2 = (grid, outside, snakeN, color) => {
  const points = [];
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const c = getColor(grid, x, y);
      if (!isEmpty(c) && c <= color && !points.some((p) => p.x === x && p.y === y)) {
        const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
        if (tunnel) {
          for (const p of tunnel)
            if (!isEmptySafe2(grid, p.x, p.y)) points.push(p);
        }
      }
    }
  return points;
};
var getColorSafe3 = (grid, x, y) => isInside(grid, x, y) ? getColor(grid, x, y) : 0;
var setEmptySafe3 = (grid, x, y) => {
  if (isInside(grid, x, y)) setColorEmpty(grid, x, y);
};
var isEmptySafe2 = (grid, x, y) => !isInside(grid, x, y) && isEmpty(getColor(grid, x, y));

// packages/solver/getBestRoute.ts
var getBestRoute = (grid0, snake0) => {
  const grid = copyGrid(grid0);
  const outside = createOutside(grid);
  const chain = [snake0];
  for (const color of extractColors(grid)) {
    if (color > 1)
      chain.unshift(
        ...clearResidualColoredLayer(grid, outside, chain[0], color)
      );
    chain.unshift(...clearCleanColoredLayer(grid, outside, chain[0], color));
  }
  return chain.reverse();
};
var extractColors = (grid) => {
  let maxColor = Math.max(...grid.data);
  return Array.from({ length: maxColor }, (_, i) => i + 1);
};

// packages/solver/getPathToPose.ts
init_snake();
init_grid();
var isEmptySafe3 = (grid, x, y) => !isInside(grid, x, y) || isEmpty(getColor(grid, x, y));
var getPathToPose = (snake0, target, grid) => {
  if (snakeEquals(snake0, target)) return [];
  const targetCells = snakeToCells(target).reverse();
  const snakeN = getSnakeLength(snake0);
  const box = {
    min: {
      x: Math.min(getHeadX(snake0), getHeadX(target)) - snakeN - 1,
      y: Math.min(getHeadY(snake0), getHeadY(target)) - snakeN - 1
    },
    max: {
      x: Math.max(getHeadX(snake0), getHeadX(target)) + snakeN + 1,
      y: Math.max(getHeadY(snake0), getHeadY(target)) + snakeN + 1
    }
  };
  const [t0, ...forbidden] = targetCells;
  forbidden.slice(0, 3);
  const openList = [{ snake: snake0, w: 0 }];
  const closeList = [];
  while (openList.length) {
    const o = openList.shift();
    const x = getHeadX(o.snake);
    const y = getHeadY(o.snake);
    if (x === t0.x && y === t0.y) {
      const path3 = [];
      let e = o;
      while (e) {
        path3.push(e.snake);
        e = e.parent;
      }
      path3.unshift(...getTunnelPath(path3[0], targetCells));
      path3.pop();
      path3.reverse();
      return path3;
    }
    for (let i = 0; i < around4.length; i++) {
      const { x: dx, y: dy } = around4[i];
      const nx = x + dx;
      const ny = y + dy;
      if (!snakeWillSelfCollide(o.snake, dx, dy) && (!grid || isEmptySafe3(grid, nx, ny)) && (grid ? isInsideLarge(grid, 2, nx, ny) : box.min.x <= nx && nx <= box.max.x && box.min.y <= ny && ny <= box.max.y) && !forbidden.some((p) => p.x === nx && p.y === ny)) {
        const snake = nextSnake(o.snake, dx, dy);
        if (!closeList.some((s) => snakeEquals(snake, s))) {
          const w = o.w + 1;
          const h2 = Math.abs(nx - x) + Math.abs(ny - y);
          const f = w + h2;
          sortPush(openList, { f, w, snake, parent: o }, (a, b) => a.f - b.f);
          closeList.push(snake);
        }
      }
    }
  }
};

// packages/types/__fixtures__/snake.ts
init_snake();
var create = (length) => createSnakeFromCells(Array.from({ length }, (_, i) => ({ x: i, y: -1 })));
var snake1 = create(1);
var snake3 = create(3);
var snake4 = create(4);
var snake5 = create(5);
var snake9 = create(9);
var snake12 = create(12);

// packages/generate-snake-animation/cellsToGrid.ts
init_grid();
var cellsToGrid = (cells) => {
  const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
  const height = Math.max(0, ...cells.map((c) => c.y)) + 1;
  const grid = createEmptyGrid(width, height);
  for (const c of cells) {
    if (c.level > 0) setColor(grid, c.x, c.y, c.level);
    else setColorEmpty(grid, c.x, c.y);
  }
  return grid;
};

// packages/generate-snake-animation/palettes.ts
var basePalettes = {
  "github-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#1b1f230a",
    colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    colorEmpty: "#ebedf0",
    colorSnake: "purple"
  },
  "github-dark": {
    colorBackground: "#0c1116",
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
    colorSnake: "purple"
  },
  "forgejo-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#00000010",
    colorEmpty: "#d4d4d8",
    colorDots: ["#d4d4d8", "#fdba74", "#f97316", "#c2410c", "#7c2d12"],
    colorSnake: "#7c2d12"
  },
  "forgejo-dark": {
    colorBackground: "#1f2937",
    colorDotBorder: "#ffffff10",
    colorEmpty: "#2b3642",
    colorDots: ["#2b3642", "#9a3412", "#ea580c", "#fb923c", "#fed7aa"],
    colorSnake: "#fed7aa"
  },
  "codeberg-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#00000010",
    colorEmpty: "#d0d7de",
    colorDots: ["#d0d7de", "#8db5dc", "#679cd0", "#4183c4", "#254f77"],
    colorSnake: "#254f77"
  },
  "codeberg-dark": {
    colorBackground: "#161b22",
    colorDotBorder: "#ffffff10",
    colorEmpty: "#3b444a",
    colorDots: ["#3b444a", "#254f77", "#31699f", "#4183c4", "#8db5dc"],
    colorSnake: "#8db5dc"
  },
  "gitlab-light": {
    colorBackground: "#ffffff",
    colorDotBorder: "#00000010",
    colorEmpty: "#edebe6",
    colorDots: ["#edebe6", "#9dc7f1", "#428fdc", "#2f68b4", "#284779"],
    colorSnake: "#284779"
  },
  "gitlab-dark": {
    colorBackground: "#1f1e24",
    colorDotBorder: "#ffffff10",
    colorEmpty: "#2a2a36",
    colorDots: ["#2a2a36", "#284779", "#2f68b4", "#428fdc", "#9dc7f1"],
    colorSnake: "#9dc7f1"
  }
};
var palettes = {
  ...basePalettes,
  // aliases
  github: basePalettes["github-light"],
  forgejo: basePalettes["forgejo-light"],
  codeberg: basePalettes["codeberg-light"],
  gitlab: basePalettes["gitlab-light"],
  default: basePalettes["github-light"]
};

// packages/generate-snake-animation/generateSnakeAnimation.ts
var getUserContribution = async (source) => {
  switch (source.platform) {
    case "github":
      return getGithubUserContribution(source.username, {
        githubToken: source.githubToken,
        baseUrl: source.baseUrl
      });
    case "gitlab":
      return getGitlabUserContribution(source.username, {
        baseUrl: source.baseUrl
      });
    case "forgejo":
      return getForgejoUserContribution(source.username, {
        baseUrl: source.baseUrl
      });
  }
};
var generateSnakeAnimation = async (source, outputs) => {
  console.log(`\u{1F3A3} fetching user contribution from ${source.platform}`);
  const cells = await getUserContribution(source);
  const grid = cellsToGrid(cells);
  const snake = snake4;
  console.log("\u{1F4E1} computing best route");
  const chain = getBestRoute(grid, snake);
  chain.push(...getPathToPose(chain.slice(-1)[0], snake));
  return Promise.all(
    outputs.map(async (out, i) => {
      if (!out) return;
      const { format, drawOptions, animationOptions } = out;
      switch (format) {
        case "svg": {
          console.log(`\u{1F58C} creating svg (outputs[${i}])`);
          const { createSvg: createSvg2 } = await Promise.resolve().then(() => (init_svg_creator(), svg_creator_exports));
          return createSvg2(grid, cells, chain, drawOptions, animationOptions);
        }
        case "gif": {
          console.log(`\u{1F4F9} creating gif (outputs[${i}])`);
          const { createGif: createGif2 } = await Promise.resolve().then(() => (init_gif_creator(), gif_creator_exports));
          return createGif2(grid, cells, chain, drawOptions, animationOptions);
        }
      }
    })
  );
};

// packages/generate-snake-animation/outputsOptions.ts
var parseOutputsOption = (lines) => lines.map(parseEntry);
var parseEntry = (entry) => {
  const m = entry.trim().match(/^(.+\.(svg|gif))(\?(.*)|\s*({.*}))?$/);
  if (!m) return null;
  const [, filename, format, _, q1, q2] = m;
  const query = q1 ?? q2;
  let sp = new URLSearchParams(query || "");
  try {
    const o = JSON.parse(query);
    if (Array.isArray(o.color_dots)) o.color_dots = o.color_dots.join(",");
    sp = new URLSearchParams(o);
  } catch (err) {
    if (!(err instanceof SyntaxError)) throw err;
  }
  const drawOptions = {
    sizeDotBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    ...palettes["default"]
  };
  const animationOptions = {
    frameByStep: 1,
    stepDurationMs: 100
  };
  {
    const palette = palettes[sp.get("palette")];
    if (palette) {
      Object.assign(drawOptions, palette);
    }
  }
  if (sp.has("color_dots")) {
    const colors = sp.get("color_dots").split(/[,;]/);
    drawOptions.colorDots = colors;
    drawOptions.colorEmpty = colors[0];
  }
  if (sp.has("color_snake")) drawOptions.colorSnake = sp.get("color_snake");
  if (sp.has("color_background"))
    drawOptions.colorBackground = sp.get("color_background");
  if (sp.has("color_dot_border"))
    drawOptions.colorDotBorder = sp.get("color_dot_border");
  return {
    filename,
    format,
    drawOptions,
    animationOptions
  };
};

// packages/action/github-action.ts
var os = __toESM(require("node:os"));
var getInput = (name) => process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
var setFailed = (message) => {
  process.exitCode = 1;
  process.stdout.write(`::error::${escapeData(message)}::${os.EOL}`);
};
function escapeData(s) {
  return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}

// packages/action/index.ts
(async () => {
  try {
    const userName = getInput("github_user_name");
    const githubToken = process.env.GITHUB_TOKEN ?? getInput("github_token");
    const outputsRaw = [
      ...getInput("outputs").split("\n"),
      //
      // legacy
      getInput("gif_out_path"),
      getInput("svg_out_path")
    ].map((x) => x.trim()).filter(Boolean);
    const outputs = parseOutputsOption(outputsRaw);
    const results = await generateSnakeAnimation(
      { platform: "github", username: userName, githubToken },
      outputs
    );
    outputs.forEach((out, i) => {
      const result = results[i];
      if (out?.filename && result) {
        console.log(`\u{1F4BE} writing to ${out?.filename}`);
        fs2.mkdirSync(path2.dirname(out?.filename), { recursive: true });
        fs2.writeFileSync(out?.filename, result);
      }
    });
  } catch (e) {
    setFailed(`Action failed with "${e.message}"`);
  }
})();
