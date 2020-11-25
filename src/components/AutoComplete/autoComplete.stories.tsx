import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

export default {
  title: 'AutoComplete',
  component: AutoComplete,
  argTypes: {
    onSelect: { action: 'Select' },
    onChange: { action: 'Change' },
  },
} as Meta
const Template: Story<AutoCompleteProps> = (args) => <AutoComplete {...args} />

const lakers = [
  'Bradley',
  'Pope',
  'Caruso',
  'Cook',
  'Cousins',
  'James',
  'AD',
  'Green',
  'Howard',
  'Kuzma',
  'McGee',
  'Rando',
]

const handleDefaultFetch = (query: string) => {
  console.log(query)
  return lakers
    .filter((name) => name.includes(query))
    .map((name) => ({ value: name }))
}

export const Default = Template.bind({})
Default.storyName = 'AutoComplete'
Default.args = {
  placeholder: 'Default autocomplete',
  fetchSuggestions: handleDefaultFetch,
}

const lakersWithNumber = [
  { value: 'Bradley', number: 11 },
  { value: 'Pope', number: 1 },
  { value: 'Caruso', number: 4 },
  { value: 'Cook', number: 2 },
  { value: 'Cousins', number: 15 },
  { value: 'James', number: 23 },
  { value: 'AD', number: 3 },
  { value: 'Green', number: 14 },
  { value: 'Howard', number: 39 },
  { value: 'Kuzma', number: 0 },
]
interface LakerPlayerProps {
  value: string
  number?: number
}

const customizedRenderOption = (item: DataSourceType<LakerPlayerProps>) => {
  return (
    <>
      <b>Name:{item.value} </b>
      &nbsp;&nbsp;&nbsp;
      <span>Number:{item.number}</span>
    </>
  )
}

const handleCustomizedFetch = (query: string) => {
  return lakersWithNumber.filter((player) => player.value.includes(query))
}

export const Customized = Template.bind({})
Customized.args = {
  placeholder: 'Customized autocomplete',
  fetchSuggestions: handleCustomizedFetch,
  renderOption: customizedRenderOption,
}

interface GithubUserProps {
  login?: string
  url?: string
}

const handleAsyncFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      return items
        .slice(0, 10)
        .map((item: any) => ({ value: item.login, ...item }))
    })
}

const renderAsyncOption = (item: DataSourceType<GithubUserProps>) => {
  return (
    <>
      <span>
        <b>{item.login}</b>
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>{item.url}</span>
    </>
  )
}

export const AsyncAutocomplete = Template.bind({})
AsyncAutocomplete.args = {
  placeholder: 'Input github username',
  fetchSuggestions: handleAsyncFetch,
  renderOption: renderAsyncOption,
}

// const SimpleComplete = () => {
//   const lakers = [
//     'bradley',
//     'pope',
//     'caruso',
//     'cook',
//     'cousins',
//     'james',
//     'AD',
//     'green',
//     'howard',
//     'kuzma',
//     'McGee',
//     'rando',
//   ]

//   const lakersWithNumber = [
//     { value: 'bradley', number: 11 },
//     { value: 'pope', number: 1 },
//     { value: 'caruso', number: 4 },
//     { value: 'cook', number: 2 },
//     { value: 'cousins', number: 15 },
//     { value: 'james', number: 23 },
//     { value: 'AD', number: 3 },
//     { value: 'green', number: 14 },
//     { value: 'howard', number: 39 },
//     { value: 'kuzma', number: 0 },
//   ]

//   // const handleFetch = (query: string) => {
//   //   return lakers.filter((name) => name.includes(query)).map(name=> ({value:name}))
//   // }

//   // const handleFetch = (query: string) => {
//   //   return lakersWithNumber.filter((player) => player.value.includes(query))
//   // }

//   const handleFetch = (query: string) => {
//     return fetch(`https://api.github.com/search/users?q=${query}`)
//       .then((res) => res.json())
//       .then(({ items }) => {
//         return items
//           .slice(0, 10)
//           .map((item: any) => ({ value: item.login, ...item }))
//       })
//   }

//   // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
//   //   return (
//   //     <>
//   //       <h2>Name:{item.value}</h2>
//   //       <p>Number:{item.number}</p>
//   //     </>
//   //   )
//   // }

//   // const renderOption = (item: DataSourceType<GithubUserProps>) => {
//   //   return (
//   //     <>
//   //       <h2>Name:{item.login}</h2>
//   //       <p>Number:{item.url}</p>
//   //     </>
//   //   )
//   // }

//   return (
//     <AutoComplete
//       fetchSuggestions={handleFetch}
//       onSelect={action('selected')}
//       // renderOption={renderOption}
//     ></AutoComplete>
//   )
// }

// storiesOf('AutoComplete Component', module).add('AutoComplete', SimpleComplete)
