type booking = {
    bookingcheckin?: Date;
    bookingcheckout?: Date;
    total?: number;
    numberadult?: number;
    numberchild?: number;
    paymenttype?: number;
    userID?: string;
    roomID?: string;
};
export default booking;