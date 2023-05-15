export interface Notebook {
  userID: string;
  type: 'DAY' | 'MONTH';
  date: string;
  feelings?: string[];
  rating?: number;
  notes?: {
    howdidifeel?: string;
    whatwentwell?: string;
    whatcouldbeimproved?: string;
    continue?: string;
    improve?: string;
    start?: string;
    stop?: string;
  };
}

//   export interface Notebook {
//     type: "DAY" | "WEEK" | "MONTH";
//     date: string;
//     trades: Trade[];
//     prettyDate: string;
//     netPL: number;
//     winRate: number;
//     wins: number;
//     losses: number;
//     rating?: number;
//     feelings?: string[];
//     notes?: {
//       howdidifeel?: string;
//       whatwentwell?: string;
//       whatcouldbeimproved?: string;
//       continue?: string;
//       improve?: string;
//       start?: string;
//       stop?: string;
//     };
//   }
