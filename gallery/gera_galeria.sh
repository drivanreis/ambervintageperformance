#!/bin/bash

# Define a pasta raiz para a galeria, a partir da raiz do projeto.
GALLERY_DIR="public/gallery"
# Define o arquivo de saída para os dados da galeria.
OUTPUT_FILE="src/data/gallery-data.ts"
# Define a variável com o caminho base do site.
BASENAME="/ambervintageperformance"

# Inicia o arquivo de saída, limpando qualquer conteúdo anterior.
cat > "$OUTPUT_FILE" <<EOF
export interface GalleryMedia {
  type: "image" | "video";
  src: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  medias: GalleryMedia[];
}

export const galleryData: GalleryProject[] = [
EOF

# Cria um array com os caminhos das pastas de projetos, ordenados.
mapfile -t project_dirs < <(find "$GALLERY_DIR" -mindepth 1 -maxdepth 1 -type d | sort)
project_count=${#project_dirs[@]}

# Loop através dos projetos.
for ((i=0; i<project_count; i++)); do
  project_path="${project_dirs[$i]}"
  project_name=$(basename "$project_path")

  # Converte o nome do diretório em um título formatado, sem sed.
  title_words=()
  read -ra words <<< "$(echo "$project_name" | tr '-' ' ')"
  for word in "${words[@]}"; do
    title_words+=("$(tr '[:lower:]' '[:upper:]' <<< "${word:0:1}")${word:1}")
  done
  project_title="${title_words[*]}"

  # Inicia a estrutura do projeto no arquivo de saída.
  cat >> "$OUTPUT_FILE" <<EOF
  {
    id: "$project_name",
    title: "$project_title",
    medias: [
EOF

  # Coletamos a lista de mídias para o projeto e iteramos sobre elas.
  mapfile -t media_files < <(find "$project_path" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.mp4" \) | sort)
  media_count=${#media_files[@]}

  # Loop através das mídias.
  for ((j=0; j<media_count; j++)); do
    media_file="${media_files[$j]}"
    file_extension="${media_file##*.}"
    file_type="image"
    if [[ "$file_extension" == "mp4" ]]; then
      file_type="video"
    fi
    
    # Gerando o caminho corretamente, sem sed.
    file_path="${media_file/public/$BASENAME}"

    # Adiciona a entrada da mídia.
    cat >> "$OUTPUT_FILE" <<EOF
      {
        type: "$file_type",
        src: "$file_path"
      }
EOF
    # Adiciona vírgula se não for o último item da mídia.
    if (( j < media_count - 1 )); then
      echo "," >> "$OUTPUT_FILE"
    fi
  done
  
  # Finaliza a estrutura de mídias e do projeto.
  cat >> "$OUTPUT_FILE" <<EOF
    ]
  }
EOF

  # Adiciona vírgula se não for o último item do projeto.
  if (( i < project_count - 1 )); then
    echo "," >> "$OUTPUT_FILE"
  fi
done

# Finaliza o array principal e o arquivo.
echo "];" >> "$OUTPUT_FILE"

echo "Arquivo de dados da galeria gerado com sucesso em $OUTPUT_FILE"
