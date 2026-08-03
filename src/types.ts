export type PageId = 1 | 2 | 3 | 4;

export interface AppState {
  currentPage: PageId;
  recipientName: string;
  isMusicPlaying: boolean;
  letterOpenedPage2: boolean;
  sketchRevealedPage4: boolean;
  heartCountPage4: number;
}
