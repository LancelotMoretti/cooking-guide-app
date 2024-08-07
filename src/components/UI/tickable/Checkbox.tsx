import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CheckboxStyles } from '@/styles/Checkbox';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
    initialChecked?: boolean;
    onPress?: (checked: boolean) => void;
    style?: object;
}

interface CheckboxState {
    checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props: CheckboxProps) {
        super(props);
        this.state = {
        checked: props.initialChecked || false,
        };
    }

    handlePress = () => {
        this.setState(
        (prevState) => ({ checked: !prevState.checked }),
        () => {
            if (this.props.onPress) {
            this.props.onPress(this.state.checked);
            }
        }
        );
    };

    render() {
        const { style } = this.props;
        const { checked } = this.state;

        return (
            <Pressable onPress={this.handlePress} style={[CheckboxStyles.checkbox, style]}>
                {checked && <Ionicons name="checkmark" size={24} color="white" />}
            </Pressable>
        );
    }
}