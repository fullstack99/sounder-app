export const GAME_ID: string = 'sounder-app';

//{{BRANCH}} replaced by CircleCI with proper value
let BRANCH = '{{BRANCH}}';

//{{BRANCH}} wasn't replaced make it debug
if (BRANCH.indexOf('{{BR') === 0) {
    BRANCH = 'debug';
}

const BUILD_NUM = '{{BUILD_NUM}}';

export {BRANCH, BUILD_NUM};

export interface ICardVO {
    id: number,
    url: string,
    path: string
}

export interface ICardData {
    card: ICardVO;
    index: number;
    flipped: boolean;
    matched?: boolean;
}

export interface IGameData {
    cardBack: IFileData,
    cards: ICardVO[],
    timer: number,
    memorize: number
    liveFeed: boolean;
}

export interface IGameState {
    active?: {
        id: string,
        data: IGameData,
    },
    isStarted?: boolean;
    bg?: IFileData,
    logo?: IFileData,
    flippedCards?: number[];
    result?: string;
}

interface IFileData {
    url: string;
    path: string;
}