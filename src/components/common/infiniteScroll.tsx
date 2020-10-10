import { Fund, FundName } from 'apiTypes'
import React, { ReactNode } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
//import { Fn } from '@types/react-infinite-scroll-component'
interface Props {
  funds?: FundName[] | null
  getMoreFunds?(): void
  children?: ReactNode
}

const InfiniteScrollComponent = (props: Props) => {
  const { funds, getMoreFunds, children } = props
  return (
    <InfiniteScroll
      dataLength={funds?.length || 0} //This is important field to render the next data
      next={() => {
        if (getMoreFunds) {
          getMoreFunds()
        }
      }}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {children}
    </InfiniteScroll>
  )
}

export default InfiniteScrollComponent
