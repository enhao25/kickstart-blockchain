import React from 'react'
import { Menu } from 'semantic-ui-react'

const header = () => {
    return (
        <Menu>
            <Menu.Item>
                CrownCoin
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaigns
                </Menu.Item>

                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default header;