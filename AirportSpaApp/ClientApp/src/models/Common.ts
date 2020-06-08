import { ThunkDispatch } from 'redux-thunk';

export class PageSize /*implements PageResult*/ {
    constructor(public number?: number, public size?: number, public total?: number) {
        this.number = number;
        this.size = size;
        this.total = total;
    }
}

export class PageSizeRecords<TRecord> extends PageSize {
    constructor(recs: TRecord[], number?: number, size?: number, total?: number) {
        super(number, size, total);
        this.records = recs;
    }

    public records!: TRecord[];
}

export interface ConnectedComponentProps {
    dispatch: ThunkDispatch<{}, {}, any>
}
