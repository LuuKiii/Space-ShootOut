import { App } from './app/app';
// import './scss/main.scss'

// console.log("Hello World!");

// function importAssetGroup(r: any) {
//   let images: { [key: string]: any } = {};
//   r.keys().map((item: any, index: any) => {
//     images[item.replace('./', '')] = r(item);
//   })
//   return images;
// }

// const images = importAssetGroup(require.context('./assets', false, /\.(eot|svg|png|jpg|gif|ico)$/i));

const app = new App()
