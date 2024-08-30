// import React from 'react';
// import { Pressable, Image, StyleSheet, GestureResponderEvent, ImageProps } from 'react-native';

// interface ButtonImageProps extends ImageProps {
//     onPress: (event: GestureResponderEvent) => void;
//     style?: object;
// }

// export class ButtonImage extends React.Component<ButtonImageProps> {
//     render() {
//         const { onPress, style, ...otherProps } = this.props;
//         return (
//         <Pressable
//             style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
//             onPress={onPress}
//         >
//             <Image {...otherProps} style={[style]} />
//         </Pressable>
//         );
//     }
// }