import { ThunkDispatch } from 'redux-thunk';

export class PageSize /*implements PageResult*/ {
    constructor(public number?: number, public size?: number, public totalPages?: number) {
        this.number = number;
        this.size = size;
        this.totalPages = totalPages;
    }
}

export class PageSizeRecords<TRecord> extends PageSize {
    constructor(recs: TRecord[], number?: number, size?: number, totalPages?: number) {
        super(number, size, totalPages);
        this.records = recs;
    }

    public records!: TRecord[];
}

export interface ConnectedComponentProps {
    dispatch: ThunkDispatch<{}, {}, any>
}
