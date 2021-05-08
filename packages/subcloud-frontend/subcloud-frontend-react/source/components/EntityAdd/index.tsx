// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
        plurid,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        EntityAddField,
    } from '~data/interfaces'

    import {
        StyledH1,
        StyledPluridPureButton,
        StyledPluridLinkButton,

        PluridInputLine,
    } from '~utilities/services/styled';
    // #endregion external


    // #region internal
    import {
        StyledEntityAdd,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface EntityAddProperties<E = any> {
    // #region required
        // #region values
        fields: EntityAddField[];
        type: string;
        // #endregion values

        // #region methods
        action: (
            entity: E,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        textTitle?: string;
        textAdd?: string;
        textCancel?: string;
        theme?: Theme;
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const EntityAdd: React.FC<EntityAddProperties<any>> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            fields,
            type,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            theme: themeProperty,
            textTitle: textTitleProperty,
            textAdd: textAddProperty,
            textCancel: textCancelProperty,
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;

    const theme = themeProperty || plurid;
    const textTitle = textTitleProperty || `Add New ${type}`;
    const textAdd = textAddProperty || `Add ${type}`;
    const textCancel = textCancelProperty || `cancel`;
    // #endregion properties


    // #region state
    const [
        entity,
        setEntity,
    ] = useState({});

    const [
        values,
        setValues,
    ] = useState({});

    const [
        validEntity,
        setValidEntity,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const addEntity = async () => {
        if (!validEntity) {
            return;
        }

        action(entity);
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            addEntity();
        }
    }

    const updateField = (
        name: string,
        event: any,
    ) => {
        values[name] = event.target.value;
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (
            values
        ) {
            setValidEntity(true);
        } else {
            setValidEntity(false);
        }
    }, [
        values,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledEntityAdd
            theme={theme}
        >
            <StyledH1>
                {textTitle}
            </StyledH1>

            {fields.map(field => (
                <PluridInputLine
                    name={field.name}
                    text={values[field.name] || field.default || ''}
                    theme={theme}
                    atChange={(event) => updateField(field.name, event)}
                    atKeyDown={handleEnter}
                />
            ))}

            <StyledPluridPureButton
                text={textAdd}
                atClick={() => addEntity()}
                level={2}
                disabled={!validEntity}
            />

            {cancel && (
                <StyledPluridLinkButton
                    text={textCancel}
                    atClick={() => cancel()}
                    theme={theme}
                    level={2}
                />
            )}
        </StyledEntityAdd>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default EntityAdd;
// #endregion exports
