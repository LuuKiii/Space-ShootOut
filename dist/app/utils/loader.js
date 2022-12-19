var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ResourceLoader {
    constructor(imageURLs) {
        this.imageURLs = imageURLs;
    }
    loadImage(src) {
        return __awaiter(this, void 0, void 0, function* () {
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject;
                img.src = src;
            });
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all(this.imageURLs.map(this.loadImage)).then(images => {
                console.log(images);
            }).catch(() => {
                console.log('not');
            });
        });
    }
}
//# sourceMappingURL=loader.js.map