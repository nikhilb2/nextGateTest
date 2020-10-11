export type Fund = {
        id: string,
        fundid: string,
        subfund: string,
        class: string,
        date: 20200504,
        report_status: string,
        nb_alerts: 0,
        name: string
}

export type SubFund =  {
    id: string,
    classes: string[]
}

export type ClassType= {
    id: string
    name: string
}

export type FundName = {
    id: string
    name: string
}

export type Success = Object | null

export type Fail = {
    err : string
}