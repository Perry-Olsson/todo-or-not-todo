import React from 'react';
import { Animated, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native';
import { useFormikContext } from 'formik';

//components
import Text from '../components/Text';
import FormikTextInput from '../components/FormikTextInput';
import Logo from '../components/Logo';

//style
import theme from '../components/theme';

const LoginForm = ({ onSubmit }) => {
  const { values } = useFormikContext();

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Animated.View style={ styles.formContainer }>
        <Logo style={styles.logo} />
        <FormikTextInput type='secondary' name='username' placeholder='Username' />
        <FormikTextInput type='secondary' name='password' placeholder='Password' secureTextEntry />
        <TouchableHighlight onPress={inputIsValid(values) ? onSubmit : null}>
          <Text style={[styles.submit, !inputIsValid(values) && { backgroundColor: '#917082' }]}>Sign in</Text>
        </TouchableHighlight>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const inputIsValid = (values) => {
  if (values.username && values.password)
    return true;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    bottom: 40
  },
  submit: {
    borderRadius: 4,
    padding: 10,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.button,
    textAlign: 'center',
    backgroundColor: theme.colors.logo
  }
});

export default LoginForm;