export interface Ticket {
    seat: string;
    class: BoardingClass;
    price: number;
}

enum BoardingClass {
    Economy,
    Business,
    First
}

export const ticketTranslates: any = {
    [BoardingClass.Economy]: 'Эконом',
    [BoardingClass.Business]: 'Бизнес',
    [BoardingClass.First]: 'Первый класс',
}