export type Card = {
    id: number,
    state: string,
    create_Time: string,
    handleOpen: (id: number) => void
}

export type CardUpdateDto = {
    id: number,
    state: string,
    notes: string | null
}

export type JobCardInputDto = {
    state: string,
    client_name: string | null,
    client_contact: string | null,
    notes: string | null
}

export type DetailCard = {
    id: number,
    state: string,
    create_Time: string,
    client_name: string | null,
    client_contact: string | null,
    notes: string | null
}



export interface Props {
    open: boolean,
    handleClose: () => void,
    id: number
}