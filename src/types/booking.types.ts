type booking = {
    bookingcheckin?: Date;
    bookingcheckout?: Date;
    total?: number;
    numberadult?: number;
    numberchild?: number;
    paymenttype?: string;
    userID?: string;
    roomID?: string;
    numberofRoom?: number;
};
export default booking;