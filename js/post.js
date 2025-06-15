const postsData = [
  {
    id: 1,
    banner_url:
      "https://images.unsplash.com/photo-1562089727-90aa996a6f18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "O Impacto das Mudanças Climáticas nos Oceanos",
    paragraphs: [
      "Os oceanos absorvem cerca de 30% do dióxido de carbono produzido pelas atividades humanas, resultando em sua acidificação. Este processo tem consequências devastadoras para a vida marinha.",
      "O aumento da temperatura dos oceanos está causando o branqueamento dos corais, que são ecossistemas vitais para milhares de espécies marinhas. Quando os corais morrem, toda a cadeia alimentar é afetada.",
      "O derretimento das calotas polares está elevando o nível do mar, ameaçando cidades costeiras ao redor do mundo. Milhões de pessoas podem ser forçadas a deixar suas casas nas próximas décadas.",
      "É crucial que tomemos medidas imediatas para reduzir as emissões de carbono e proteger nossos oceanos. Cada ação individual conta para preservar este recurso vital para as futuras gerações.",
    ],
  },
  {
    id: 2,
    banner_url:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A Importância da Reciclagem no Século XXI",
    paragraphs: [
      "A reciclagem é uma das formas mais eficazes de reduzir o impacto ambiental dos resíduos sólidos. Ao reciclar materiais como papel, plástico, vidro e metal, diminuímos a necessidade de extrair novos recursos naturais.",
      "Cada tonelada de papel reciclado economiza aproximadamente 17 árvores, 7.000 galões de água e energia suficiente para abastecer uma casa por seis meses. Estes números demonstram o poder transformador da reciclagem.",
      "O plástico é um dos materiais mais problemáticos para o meio ambiente. Uma única garrafa plástica pode levar até 450 anos para se decompor completamente. A reciclagem permite que esse material seja reutilizado múltiplas vezes.",
      "Para tornar a reciclagem mais eficiente, é importante separar corretamente os materiais e apoiar empresas que utilizam materiais reciclados em seus produtos. Juntos, podemos criar uma economia circular mais sustentável.",
    ],
  },
  {
    id: 3,
    banner_url:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Energias Renováveis: O Futuro Sustentável",
    paragraphs: [
      "As energias renováveis representam uma alternativa limpa e sustentável aos combustíveis fósseis. Solar, eólica, hidrelétrica e biomassa são algumas das principais fontes que podem atender às necessidades energéticas mundiais.",
      "A energia solar tem experimentado um crescimento exponencial nos últimos anos. O custo de instalação de painéis solares diminuiu significativamente, tornando essa tecnologia acessível para residências e empresas.",
      "A energia eólica é outra fonte promissora, especialmente em regiões com ventos constantes. Parques eólicos offshore estão se tornando cada vez mais comuns, aproveitando os ventos oceânicos mais intensos e consistentes.",
      "A transição para energias renováveis não apenas reduz as emissões de carbono, mas também cria empregos e impulsiona a inovação tecnológica. Investir em energia limpa é investir no futuro do nosso planeta.",
    ],
  },
  {
    id: 4,
    banner_url:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
    title: "Preservação das Florestas: Pulmões do Planeta",
    paragraphs: [
      "As florestas cobrem cerca de 31% da área terrestre global e abrigam 80% da biodiversidade terrestre. Elas desempenham um papel crucial na regulação do clima, absorvendo CO2 e produzindo oxigênio.",
      "A Amazônia, conhecida como 'pulmão do mundo', produz cerca de 20% do oxigênio da Terra. No entanto, o desmatamento desenfreado ameaça este ecossistema vital, com consequências irreversíveis para o clima global.",
      "Além de regular o clima, as florestas fornecem recursos essenciais como madeira, alimentos, medicamentos e água limpa. Milhões de pessoas dependem diretamente das florestas para sua subsistência.",
      "A preservação das florestas requer esforços coordenados entre governos, empresas e cidadãos. Apoiar produtos sustentáveis, participar de programas de reflorestamento e conscientizar outros são formas de contribuir para essa causa vital.",
    ],
  },
];

document.addEventListener("DOMContentLoaded", function () {
  loadPost();
});

function loadPost() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get("id"));

    if (!postId) {
      window.location.href = "index.html";
      return;
    }
    const posts = postsData;

    const post = posts.find((p) => p.id === postId);

    if (!post) {
      window.location.href = "index.html";
      return;
    }

    displayPost(post);
  } catch (error) {
    console.error("Error loading post:", error);
    window.location.href = "index.html";
  }
}

function displayPost(post) {
  const banner = document.getElementById("post-banner");
  banner.src = post.banner_url;
  banner.onerror = function () {
    this.src =
      "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

  document.getElementById("post-title").textContent = post.title;
  document.title = `${post.title} - Seed`;

  const paragraphsContainer = document.getElementById("post-paragraphs");
  post.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    paragraphsContainer.appendChild(p);
  });
}
