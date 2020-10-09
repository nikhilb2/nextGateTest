export type Fund = {
    index: number
    fund_name: string
    fund_id: string
    subfund_name: string
    subfund_id: string
    share_class_name: string
    share_class_id: number
    date: number,
    report_status: string
    nb_alerts: number
}

export type FundName = {
    id: string
    name: string
    classes: string[]
    subfunds: string[]
}

export type Success = Object | null

export type Fail = {
    err : string
}