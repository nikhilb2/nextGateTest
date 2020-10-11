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

export type SubFundOfFund = {
    subfundId: string
    subfundName: string
}

export type SubFund =  {
    id: string,
    name: string,
    subfunds: SubFundOfFund[]
}

export type ClassType= {
    id: string
    name: string
}

export type FundName = {
    id: string
    name: string
}

export type SubFundClasses = {
    id: string
    name: string
}

export type SubFunClassesOfFund = {
    id: string
    name: string
    subFund: string
    classes: SubFundClasses[]
}

export type Success = Object | null

export type Fail = {
    err : string
}