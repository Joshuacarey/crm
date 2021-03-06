import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 */

/**
 * @typedef {import('@material-ui/core').Theme} Theme
 */

/**
 * @template K
 * @typedef {import('@material-ui/core/styles').StyleRulesCallback<K>} StyleRulesCallback
 */

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import RestoreIcon from '@material-ui/icons/RestoreOutlined'

import DrawerButton from 'components/DrawerButton'

const activationBtnStyle = { backgroundColor: 'white' }
const activationBtnTxtStyle = { marginLeft: '5px' }

const APPEARANCE_SUBHEADER = (
  <ListSubheader disableSticky>APPEARANCE</ListSubheader>
)

const ICON_SUBHEADER = <ListSubheader disableSticky>ICON</ListSubheader>

const explanationTextMargin = {
  marginTop: 20,
}

/**
 * @typedef {object} Setting
 * @prop {boolean|string|string[]} settingValueOrValues
 * @prop {string} id
 * @prop {string} paramName
 */

/**
 * @typedef {object} Props
 * @prop {string|null} helpText
 * @prop {React.ComponentType<SvgIconProps>|null} icon
 * @prop {boolean} isActive
 * @prop {boolean} isIndexed
 * @prop {string} label
 * @prop {(() => void)=} onClickDeactivate
 * @prop {(() => void)=} onClickHelpTextBtn (Optional)
 * @prop {(() => void)=} onClickIconBtn (Optional)
 * @prop {(() => void)=} onClickIndex (optional)
 * @prop {(() => void)=} onClickLabelBtn (Optional)
 * @prop {(() => void)=} onClickReactivate (Optional)
 * @prop {(() => void)=} onClickRequired (optional)
 * @prop {((id: string) => void)=} onClickSetting (Optional)
 * @prop {boolean} required
 * @prop {Setting[]} settings
 */

/**
 * @param {Theme} theme
 */
const styles = theme => ({
  actionButton: {
    position: 'absolute',
    bottom: 34,
  },
})

export {} // stop jsdoc from merging

/**
 * @augments React.PureComponent<Props & { classes: Classes }>
 */
class PropDefEditor extends React.PureComponent {
  /**
   * @private
   * @param {string=} id
   */
  onClickSetting = id => {
    const { onClickSetting } = this.props

    // CAST: We are supplying the ID to the drawer button so it will be defined
    onClickSetting && onClickSetting(/** @type {string} */ (id))
  }

  render() {
    const {
      helpText,
      icon,
      isActive,
      isIndexed,
      label,
      onClickDeactivate,
      onClickHelpTextBtn,
      onClickIconBtn,
      onClickIndex,
      onClickLabelBtn,
      onClickReactivate,
      onClickRequired,
      required,
      settings,
      classes,
    } = this.props

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={24}
      >
        <Grid item>
          <List subheader={APPEARANCE_SUBHEADER}>
            <DrawerButton
              onClick={onClickLabelBtn}
              primaryText="Label"
              secondaryText={label}
            />

            {settings.map(setting => (
              <DrawerButton
                key={setting.id}
                id={setting.id}
                onClick={this.onClickSetting}
                primaryText={setting.paramName}
                secondaryText={(() => {
                  if (Array.isArray(setting.settingValueOrValues)) {
                    return setting.settingValueOrValues.join(', ')
                  }

                  if (typeof setting.settingValueOrValues === 'boolean') {
                    return undefined
                  }

                  return setting.settingValueOrValues
                })()}
                secTextAtBottom={Array.isArray(setting.settingValueOrValues)}
                isSwitch={typeof setting.settingValueOrValues === 'boolean'}
                switchOn={
                  typeof setting.settingValueOrValues === 'boolean'
                    ? setting.settingValueOrValues
                    : undefined
                }
              />
            ))}
          </List>
        </Grid>

        <Grid item>
          <DrawerButton
            onClick={onClickHelpTextBtn}
            primaryText="Help Text"
            secondaryText={!!helpText ? 'Enabled' : 'Disabled'}
          />
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={onClickRequired}
            primaryText="Required"
            switchOn={required}
          />

          <Typography
            align="center"
            color="textSecondary"
            style={explanationTextMargin}
            variant="body1"
          >
            {required
              ? 'Users will not be able to save if this property is empty'
              : 'Users will be able to save if this property is empty'}
          </Typography>
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={onClickIndex}
            primaryText="Index"
            switchOn={isIndexed}
          />

          <Typography
            align="center"
            color="textSecondary"
            style={explanationTextMargin}
            variant="body1"
          >
            {isIndexed
              ? 'This property will appear in Universal Search results'
              : 'This property will not appear in Universal Search results'}
          </Typography>
        </Grid>

        <Grid item>
          <List subheader={ICON_SUBHEADER}>
            <DrawerButton
              icon={icon}
              onClick={onClickIconBtn}
              primaryText={icon ? undefined : 'No Icon Selected'}
            />
          </List>
        </Grid>

        <Grid item>
          <Button
            className={classes.actionButton}
            color={isActive ? 'secondary' : 'primary'}
            onClick={isActive ? onClickDeactivate : onClickReactivate}
            style={activationBtnStyle}
            fullWidth
          >
            {isActive ? <DeleteOutline /> : <RestoreIcon />}
            {isActive ? (
              <span style={activationBtnTxtStyle}>Deactivate</span>
            ) : (
              <span style={activationBtnTxtStyle}>Reactivate</span>
            )}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
 * @typedef {Record<ClassNames, string>} Classes
 */

export {} // stop jsdoc comments from merging

const styled = withStyles(
  /** @type {StyleRulesCallback<ClassNames>} */ (styles),
)(PropDefEditor)

export default styled
