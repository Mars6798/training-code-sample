import { TopBar, Icon, Frame, Text } from '@shopify/polaris';
import { NotificationIcon, ArrowLeftIcon, SidekickIcon } from '@shopify/polaris-icons';

function Header() {
    const logo = {
        topBarSource:
            'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
        width: 86,
        url: '#',
        accessibilityLabel: 'Shopify',
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{content: 'Back to Shopify', icon: ArrowLeftIcon}],
                },
                {
                    items: [{content: 'Community forums'}],
                },
            ]}
            name="Stellar Interiors"
            initials="D"
        />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField
            placeholder="Search"
        />
    );

    const secondaryMenuMarkup = (
        <div style={{display: 'flex'}}>
            <TopBar.Menu
                activatorContent={
                    <span>
                      <Icon source={SidekickIcon} />
                      <Text as="span" visuallyHidden>
                        Secondary menu
                      </Text>
                    </span>
                }
                actions={[
                    {
                        items: [{content: 'Community forums'}],
                    },
                ]}
            />
            <TopBar.Menu
                activatorContent={
                    <span>
                      <Icon source={NotificationIcon} />
                      <Text as="span" visuallyHidden>
                        Secondary menu
                      </Text>
                    </span>
                }
                actions={[
                    {
                        items: [{content: 'Notifications'}],
                    },
                ]}
            />
        </div>
    );

    const topBarMarkup = (
        <TopBar
            userMenu={userMenuMarkup}
            secondaryMenu={secondaryMenuMarkup}
            searchField={searchFieldMarkup}
        />
    );

    return (
        <div style={{height: '60px'}}>
            <Frame topBar={topBarMarkup} logo={logo} />
        </div>
    );
}

export default Header;