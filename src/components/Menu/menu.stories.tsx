import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Menu, MenuProps } from './menu'
import { MenuItem } from './menuItem'
import { SubMenu } from './subMenu'

export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
    onSelect: { action: 'Select' },
  },
} as Meta

const Template: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>xyz</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>dropdown1</MenuItem>
      <MenuItem>dropdown2</MenuItem>
      <MenuItem>dropdown3</MenuItem>
    </SubMenu>
  </Menu>
)

export const BasicMenu = Template.bind({})
BasicMenu.args = {}

export const VerticalMenu = Template.bind({})
VerticalMenu.args = {
  mode: 'vertical',
}

export const DefaultOpenSubMenu = Template.bind({})
DefaultOpenSubMenu.args = {
  mode: 'vertical',
  defaultOpenSubMenus: ['3'],
}
