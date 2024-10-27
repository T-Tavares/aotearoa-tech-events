import localFont from 'next/font/local';
import {Karla as KarlaImport} from 'next/font/google';

export const OpenSans = localFont({src: './OpenSans/static/OpenSans-Regular.ttf', variable: '--open-sans'});
export const OpenSansBold = localFont({src: './OpenSans/static/OpenSans-ExtraBold.ttf', variable: '--open-sans-bold'});
export const OleoScript = localFont({src: './OleoScript/OleoScript-Regular.ttf', variable: '--oleo-script'});
export const PlaywriteUDTrad = localFont({
    src: './PlaywriteUSTrad/static/PlaywriteUSTrad-Regular.ttf',
    variable: '--playwrite-ud-trad',
});
export const PoetsenOne = localFont({src: './PoetsenOne/PoetsenOne-Regular.ttf', variable: '--poetsen-one'});

// ------------------------------------------------------ //

export const Karla = KarlaImport({
    weight: '600',
    subsets: ['latin-ext'],
});
export const KarlaBold = KarlaImport({
    weight: '800',
    subsets: ['latin-ext'],
});
