# Projeto cangaceiro-webpack
Atualização do projeto de **Webpack** da Alura, utilizando o **Webpack** versão **[4.44.1]**.

## O que foi utilizado
- **NodeJS** versão **[14.8.0]**
- **npm** como gerenciador de pacotes versão **[6.14.7]**
- **Webpack** versão **[4.44.1]**:
  * `html-webpack-plugin` versão **[4.3.0]**
  * `mini-css-extract-plugin` versão **[0.10.0]**
  * `optimize-css-assets-webpack-plugin` versão **[5.0.3]**
  * `style-loader` versão **[1.2.1]**
  * `css-loader` versão **[4.2.2]**
  * `babel-loader` versão **[8.1.0]**
- **Webpack DevServer** versão **[3.11.0]**
- **Webpack CLI** versão **[3.3.12]**
- **JQuery** versão **[3.5.1]**
- **Boostrap** versão **[4.5.2]**
- **Babel**:
  * `@babel/core` versão **[7.11.4]**
  * `@babel/preset-env` versão **[7.11.0]**
  * `@babel/plugin-proposal-decorators` versão **[7.10.5]**
  * `@babel/polyfill` versão **[7.10.4]**
  * `core-js` versão **[3.6.5]**

## Mudanças e Atualizações
- Foi utilizado o babel mais recente, motivo pelo qual foi necessário instalar as bibliotecas citadas anteriormente.
  * além disso, a configuração do babel foi ajustada para comtemplar esses novos *packages*, e também não precisar mais do *package* `reflect-metadata` utilizado no projeto original
  * por este motivo, foi necessário também atualizar o `core-js` para sua versão mais recente **[3.6.5]**, já que é utilizado pelo `@babel/polyfill`
  * o Babel suporta o dynamic import com o @babel/preset-env desde a versão [**[7.5.0]**](https://bit.ly/2CZyGiU)
- No **Webpack 4.x** existem algumas configurações pré-definidas de acordo com o ***mode*** utilizado, o qual pode ser configurado no `webpack.config.js`, ou passado como parâmetro CLI como p.ex. **`webpack --mode=production`** ou **`webpack --mode=development`**
  * sem definir esta configuração, o **Webpack** irá utilizar o *mode: 'production'* como *default*
  * as configurações pré-definidas para cada modo podem ser conferidas [**aqui**](https://bit.ly/2D1wurc), sendo uma delas a *option* ***optimization.minimize: true***, a qual habilita a minificação, em conjunto com a *option* ***optimization.minimizer***, sendo a última utilizada para definir os *plugins* de minificação, em que o **Webpack** já cria por *default* uma instância do [TerserPlugin](https://bit.ly/2YAIYhe)
  * caso for necessário incluir algum *plugin* de minificação em *optimization.minimizer*, seja CSS ou JS, deve-se importar o TerserPlugin em `webpack.config.js` e criar sua instância, já que estamos redefinindo *optimization.minimizer* e, consequentemente, apagando as configurações *default*. O mesmo vale caso queira ajustar alguma configuração do próprio TerserPlugin
  * documentação da nova propriedade [**optimization**](https://v4.webpack.js.org/configuration/optimization/)
- Foi optado em [extrair](https://bit.ly/2QpRtqM) os comentários de licenciamento dos arquivos JS minificados com o **TerserJSPlugin**, utilizando **`{ terserOptions: { output: { comments: /@license/i }} extractComments: true }`**
- No **OptimizeCSSAssetsPlugin** apenas é necessário definir o que já não é *default*, no caso apenas **`{ cssProcessorPluginOptions: { preset: ['default', { discardComments: { removeAll: true }}]}}`**, já que o *cssnano* já é utilizado por *default*. Esta [configuração](https://cssnano.co/docs/optimisations/discardcomments) é necessária para remover todos os comentários, inclusive os de licenciamento **`/^\**!/`**
  * não encotrado a opção de extrair *license comments* como no TerserPlugin
- No **Webpack 4.x** é necessário utilizar o [**`mini-css-extract-plugin`**](https://bit.ly/3aZRpY6) ao invés do `extract-text-webpack-plugin` para extrair os arquivos CSS importados em arquivos JS
  * foi utilizado a [estratégia](https://bit.ly/3aY9xBX) em extrair para um único arquivo CSS
- No **Webpack 4.x** com o **Boostrap 4.x** não foi necessário instalar fontes
- No **Webpack 4.x** o [**ModuleConcatenationPlugin**](https://bit.ly/2YDrbWs) já é ativado por *default* em *production mode*
- O **SplitChunksPlugin** é utilizado ao invés do *CommonChunkPlugin*, o qual foi [**descontinuado**](https://v4.webpack.js.org/plugins/split-chunks-plugin/)
  * na minha opinião foi o que **mais** modificou a forma de trabalhar no webpack
  * segue a documentação sobre [***optimization.splitChunks***](https://bit.ly/2FYnZhH)
  * uma boa discussão sobre o assunto para conferir [aqui](https://github.com/webpack/webpack/issues/6647)
  * [de acordo](https://github.com/webpack/webpack/issues/6647#issuecomment-369868055) com um dos criadores:
    - não deve-se existir um *entrypoint* para *vendors*, já que não é um *entrypoint*
    - se quiser executar 2+ módulos em ordem sequencial em um *entrypoint*, utilize um *array*
    - não deve-se utilizar um *vendor chunk* como *runtimeChunk*, o qual não deve ser utilizado em grande parte dos projetos
    - mais [**documentação**](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693) sobre a mudança
- Houve mudança no [**import()**](https://webpack.js.org/migrate/4/#import-and-commonjs)
  * não sei dizer se esta foi a causa, mas precisei incluir o "default: " no *lazy loading* do *NegociacaoService*, e *export default* neste módulo para funcionar
- Para não precisar do `cross-env`, utilizei a [***environment option***](https://bit.ly/3jdv38o) na *command line* (CLI)
  * **`--env.production`** produz `env.production == true`
  * utilizando **`module.exports = (env) => { handleEnv(){ if(env && env.production){...} } return{ entry, output, ... }}`** em `webpack.config.js`
- Os scripts de *production* e *development* foram ajustados em **`package.json`**
- Guia de migração **Webpack v3** para **v4** [aqui](https://v4.webpack.js.org/migrate/4/)
  * [guia de migração](https://bit.ly/3gByoMW) para *plugin loaders*

#### (caso for lembrando de mais alterações vou incluindo aqui...)
----

## Instalação
Após baixar o projeto, executar a instalação dos componentes utilizando npm:
1. `npm ci` em **`./client/`** e `npm install` em **`./server/`**
2. executar o passo **[o que precisa ser feito após a instalação]** em *Warnings no npm* abaixo

## Warnings no npm
### [já ajustado no package-lock.json]
- removi o `watchpack-chokidar2` do *"requires"* do `watchpack`, pois ele funciona apenas com *chokidar@2* e *node 8*, então fica dando *warning* de *not supported*
- (Windows e Linux) removi todos os `fsevents` dos *"requires"* de todos os `chokidar`, que neste projeto estavam no próprio *"chokidar"* e também no *"chokidar"* dentro do `webpack-dev-server`
### [o que precisa ser feito após a instalação]
- mesmo assim, após a instalação com o `npm ci`, é necessário removê-los das *optionalDependencies* dentro de `./node_modules/chokidar/package.json`, `./node_modules/webpack-dev-server/node_modules/chokidar/package.json` e em `./node_modules/watchpack/package.json`, senão ficarão aparecendo vários warnings do fsevents, que a npm já corrigiu na v7 do npm

## Scripts em `./client`

|Script|Descrição|
|----------|---------|
|build-dev|execução do ***development mode*** do webpack, sendo o *output* a pasta `./dist`|
|build-prod|execução do ***production mode*** do webpack, sendo o *output* a pasta `./dist`|
|start-dev|execução do ***development mode*** do **webpack-dev-server**, com back-end no `http://localhost:8080`|
|start|execução do ***production mode*** do **webpack-dev-server**, com back-end no `http://endereco-da-sua-api`|
#### (obs.: endereços do back-end podem ser alterados em `webpack.config.js`)
