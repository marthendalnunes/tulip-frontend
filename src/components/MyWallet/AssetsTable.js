import React from 'react'
import { DataView, GU, textStyle } from '@1hive/1hive-ui'
import PairName from '../Farming/PairName'
import Fuse from 'fuse.js'
import Icon from '../../assets/tulip/icon.svg'
import { getNetworkConfig } from '../../networks'
import { useWallet } from 'use-wallet'

const AssetsTable = props => {
  const {
    _web3ReactContext: { chainId },
  } = useWallet()
  const assets = props.assets || []
  const fuse = new Fuse(assets, {
    keys: ['name', 'symbol'],
  })
  let image = Icon
  const network = getNetworkConfig(chainId)

  if (network) {
    image = network.token.image
  }
  const results = fuse.search(props.searchValue)
  return (
    <div
      css={`
        ${textStyle('body2')};
        font-family: 'Overpass', sans-serif;
        font-weight: 300;
        font-size: 18px;
      `}
    >
      <DataView
        fields={['Asset', 'Balance', 'Price', 'Value']}
        css={`
          border-top: none;
          margin-bottom: 20px;
        `}
        entriesPerPage={-1}
        emptyState={{
          default: {
            displayLoader: false,
            title: `${
              props.searchValue
                ? 'No results'
                : 'Connect your account to get more information about your assets'
            }`,
            subtitle: null,
            illustration: <img src={image} height={6 * GU} width={5.5 * GU} />,
            clearLabel: null,
          },
          loading: {
            displayLoader: true,
            title: 'No data available.',
            subtitle: null,
            illustration: null,
            clearLabel: null,
          },
        }}
        entries={props.searchValue ? results : assets}
        header
        renderEntry={({
          name,
          symbol,
          balance,
          price,
          value,
          image1,
          image2,
        }) => {
          const customLabel = symbol
          const imgObj = {
            pair1: image1,
            pair2: image2,
          }
          return [
            <PairName image={imgObj} name={customLabel} subheadline={name} />,
            <p>{balance}</p>,
            <p>$ {price}</p>,
            <p>$ {value}</p>,
          ]
        }}
      />
    </div>
  )
}
export default AssetsTable
