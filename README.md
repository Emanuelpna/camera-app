# 📱 Food Lens - Identificador de Alimentos e Receitas

Um aplicativo móvel desenvolvido com Expo que utiliza a câmera do celular para identificar alimentos e sugerir receitas relacionadas.

## 🎯 Sobre o Projeto

Este é um projeto acadêmico que demonstra a integração de visão computacional com uma interface móvel intuitiva. O aplicativo permite que usuários:

- 📸 Usem a câmera para identificar alimentos em tempo real
- 🔍 Visualizem receitas que contêm o alimento identificado
- 📖 Acessem detalhes completos das receitas
- 🔄 Carreguem mais opções de receitas
- 📱 Interface amigável e responsiva

## 🚀 Tecnologias Utilizadas

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev/)
- [Vision Camera](https://mrousavy.com/react-native-vision-camera/)
- [MLKit Image Labeling](https://developers.google.com/ml-kit)

## ⚙️ Como Executar

1. Clone o repositório:
   ```bash
   git clone [URL_DO_SEU_REPOSITORIO]
   cd camera-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. [Opcional] No seu celular Android, ative o modo de depuração e conecte ao celular via USB

4. Inicie o projeto:
   ```bash
   npx expo run:android --device
   ```

   >O argumento `--device` irá abrir um prompt perguntando em qual aparelho contectar. É interessante tanto em casos onde você tem tanto emulador quanto celular conectados e quer escolher qual entrar. Mas também caso só tenho o celular pois em alguns casos ele deu erro ao não achar o celular por não esperar a resposta da solicitação de permissão que aparece no dispositivo conectado.
   

## 📱 Funcionalidades

### Identificação de Alimentos
- Detecção em tempo real
- Filtragem inteligente de resultados
- Categorização automática de alimentos

### Busca de Receitas
- Sugestões baseadas no alimento identificado
- Opção de carregar mais receitas
- Visualização detalhada das receitas

## 👥 Desenvolvedores
- Emanuel Pereira do Nascimento Andrade
- Luis Gustavo Theml Novais
- Urias Góes Santos Rocha
- Mayara Mikaelly de Paula
- Marciana Pereira
- Marilia Carvalha 
- Julia Lopes

## 📚 Documentação Adicional

Para mais informações sobre as tecnologias utilizadas:
- [Documentação Expo](https://docs.expo.dev/)
- [Vision Camera Docs](https://mrousavy.com/react-native-vision-camera/docs/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)