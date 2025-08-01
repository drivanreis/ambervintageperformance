#!/bin/bash

# Abort on errors
set -e

# Função para obter o timestamp formatado
get_timestamp() {
    date +'%H:%M'
}

# # Função para apagar a branch gh-pages se ela existir
# delete_gh_pages_if_exists() {
#     echo "🔍 Verificando se a branch gh-pages existe remotamente..."
#     if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
#         echo "🚮 Apagando branch remota gh-pages..."
#         git push origin --delete gh-pages || true
#         echo "✅ Branch gh-pages apagada!"
#     else
#         echo "✅ Branch gh-pages já não existe."
#     fi
# }

echo "🧹 Excluindo a pasta dist local..."
rm -rf dist

# Etapa 1: Tentativa de exclusão da branch gh-pages
# delete_gh_pages_if_exists
# sleep 15

# Etapa 2: "Acorda, Git!" - faz novo fetch e tenta apagar de novo
echo "🔁 Atualizando informações do repositório remoto (git fetch)..."
git fetch --prune
# delete_gh_pages_if_exists
# sleep 15

echo "🧽 Limpando o cache do Git local..."
git gc --prune=now
git remote prune origin
sleep 15

echo "⚙️  Criando nova build na pasta dist com Vite..."
npm run build

echo "💾 Commitando alterações no branch main..."
git add .
TIMESTAMP=$(get_timestamp)
git commit -m "Nova pasta dist $TIMESTAMP"
git push origin main

echo "⏳ Aguardando 15 segundos para garantir atualização do GitHub..."
sleep 15

echo "🚀 Enviando conteúdo da pasta dist para a branch gh-pages (forçado)..."
git push origin $(git subtree split --prefix dist main):refs/heads/gh-pages --force

echo "⏳ Aguardando 20 segundos para publicação no GitHub Pages..."
sleep 20

echo "✅ Deploy finalizado com sucesso!"
echo "🌐 Acesse em: https://drivanreis.github.io/amberstone/"
