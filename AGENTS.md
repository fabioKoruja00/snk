# AGENTS

## Dependência, componente ou ferramenta nova

Antes de instalar qualquer dependência, componente ou ferramenta, mandar mensagem à sessão **Sistema de Monitoramento (VM)** com nome, versão, tipo, para que serve e licença, e esperar a resposta. Ela avalia se dá para compartilhar: o que servir a outros sites e sistemas entra no runner (`/opt/ci-tools`) para todos; o resto fica no manifesto e no lock deste repositório. Nenhuma dependência volta de versão; alerta sem correção na versão atual espera o Dependabot. Ferramenta que ninguém mais usa sai sozinha pela limpeza do runner.

## Estrelas das origens de skills adotadas

- Ao instalar skill externa, registrar no inventário (`SKILLS.md` ou equivalente) o nome, a URL da origem no GitHub, o caminho do `SKILL.md` e o SHA completo do commit usado.
- Cada origem adotada recebe uma `Star`, uma por repositório. A sessão dá a estrela na hora em que instala a skill, com `gh api -X PUT user/starred/<owner>/<repo>`, sem abrir pendência nem registro.
- Nunca copiar, publicar ou armazenar credenciais.

## Merge de PR

Toda PR entra na branch padrão em **squash** com mensagem limpa (`gh pr merge N --squash --delete-branch --subject "<título> (#N)" --body "<nota e Closes>"`): um commit só por PR, sem merge commit e sem a lista de commits da branch.
