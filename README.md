Planejai é uma aplicação web desenvolvida em React com TypeScript que conta com uma interface intuitiva e responsiva para planejamento financeiro. O projeto permite que o usuário realize simulações de investimentos, receba recomendações personalizadas por IA e visualize projeções detalhadas de cenários econômicos futuros.

## Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática.
- **Vite** - Ferramenta de build rápida e servidor de desenvolvimento.
- **Tailwind CSS** - Framework CSS utilitário para estilização rápida e customizável.
- **Lucide React** - Biblioteca de ícones SVG.
- **React Loading Skeleton** - Componentes de skeleton loading para melhorar a experiência do usuário durante o carregamento de dados.
- **Google Gemini API** - API de inteligência artificial para geração de insights e recomendações financeiras.
- **Google Fonts** - Fontes personalizadas para a interface.

## Como Executar a Aplicação

Siga os passos abaixo para instalar as dependências e executar a aplicação em ambiente de desenvolvimento:

1. **Clone o repositório** (caso ainda não tenha feito):

   ```bash
   git clone <url-do-repositorio>
   cd planejai
   ```

2. **Instale as dependências** do projeto (usei npm, mas pode usar pnpm):

   ```bash
   npm install ou pnpm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```bash
   Token gerado pelo IA Studio (https://aistudio.google.com/welcome)
   VITE_GEMINI_API_KEY=sua_api_key_aqui
   ```

4. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

   A aplicação estará acessível em [http://localhost:5173](http://localhost:5173).

## Melhoria Implementada

### Integração com IA para Análise Financeira

Foi implementada uma integração completa com a API Gemini para melhorar a experiência do usuário com inteligência artificial. Este recurso permite:

- **Geração de Insights Personalizados**: A aplicação envia os dados da simulação para a IA, que gera insights detalhados e recomendações financeiras personalizadas com base no perfil do usuário e nos cenários econômicos simulados.
- **Histórico de Simulações**: A aplicação armazena o histórico de simulações realizadas pelo usuário, permitindo que ele acesse e visualize suas simulações anteriores.

## Fluxo Principal

O fluxo principal da aplicação é a **Simulação de Investimentos**:

1. **Preenchimento do Formulário**: O usuário acessa a página de simulação e preenche um formulário com suas informações financeiras:

- Renda mensal bruta
- Custos fixos
- Valor destinado a parcerlas ou empréstimos mensais
- Um sonho como objetivo para levar em conta no planejamento
- Quanto tempo pretende para realizar esse sonho em meses

2. **Visualização da Simulação**: Ao fim, o usuário tem uma visão do que preencheu no formulário e pode ver o cálculo de quanto deve economizar por mês para atingir a meta, além de ver um insight financeiro

3. **Geração de Insights**: O usuário pode solicitar insights gerados por IA para obter recomendações personalizadas e análises detalhadas sobre seus investimentos.

IA avalia a viabilidade da meta, verificando se ela é alcançável com base no valor necessário, no prazo e na renda disponível. Para isso, calcula o valor mensal exigido e verifica se ele cabe no orçamento. Por exemplo, para uma viagem de R$ 5.000,00 em 12 meses, seria necessário guardar R$ 416,67 por mês; considerando uma disponibilidade mensal de R$ 2.500,00, a meta é viável e ainda possui uma margem confortável.

Em seguida, é realizado um diagnóstico financeiro, apresentando um panorama da situação atual e indicando o percentual da renda comprometido com despesas essenciais e dívidas. A partir desse diagnóstico, são apresentadas sugestões práticas, com ações concretas para manter o planejamento em execução, como separar o valor destinado ao objetivo assim que o salário for creditado, definir um limite mensal para gastos com lazer dentro do saldo disponível e evitar novas compras parceladas até a quitação do saldo devedor atual. Também são sugeridas alternativas de geração de renda extra, como vender itens sem uso em plataformas como Enjoei ou OLX e oferecer serviços freelancers na área de atuação, aumentando a receita disponível e acelerando o alcance da meta. Além disso, é realizada a alocação de investimentos, indicando o tipo de produto financeiro mais adequado ao prazo e ao perfil da meta, priorizando segurança, liquidez e rentabilidade. Como exemplo, o sistema pode sugerir a aplicação do valor mensal em um CDB com liquidez diária que pague no mínimo 100% do CDI ou no Tesouro Selic, considerando produtos que ofereçam rendimento e possibilidade de resgate conforme as condições de cada investimento.

Por fim, o sistema apresenta uma mensagem motivacional, reforçando o reconhecimento pelo planejamento realizado.

## O que Aprendi Durante o Desafio

# Técnicos

Revisitei conceitos de grid e flex
Vi mais sobre o cenário em que o useeffect não é bom em conjunto com o setState (dados disponíveis ao iniciar o componente e porque eles geram rerenders extras)

# Não Técnicos

Ideias de uso para inteligência artificial dentro de projetos
