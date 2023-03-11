import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-names';
import { getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray, regexValidation } from '../regex-validation-by-patterns';

const appIsAtRegisterURL = window.location.hash.includes('register');

const USERNAME_VALIDATION_ERRORS_NAMES = {
	latinOnly: 'latinOnly',
	atLeastOneDigit: 'atLeastOneDigit', 
}

const getRegexErrorsForUsernameValidation = (value) => ({ 
	latinOnly:  !value.match(/^[a-zA-Z\d]+$/),
	atLeastOneDigit: !value.match(/\d/)
});

const NotifyingTip = () => { 
	const { formState: { errors }} = useFormContext();

	return appIsAtRegisterURL 
		? 
			<p>
				Используйте для логина {' '}
					<span 
						className={
							appIsAtRegisterURL 
								? 
									getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
										errors, 
										REGISTER_INPUTS.username, 
										USERNAME_VALIDATION_ERRORS_NAMES.latinOnly
									) 
								: 
									''
						}
					> 
						латинский алфавит и {' '}
					</span> 
					<span
						className={
							appIsAtRegisterURL 
								? 
									getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
										errors, 
										REGISTER_INPUTS.username, 
										USERNAME_VALIDATION_ERRORS_NAMES.atLeastOneDigit
									) 
								: 
									''
						}
					> 
						цифры 
					</span>
			</p>
		:
			null
}

export const UsernameInput = ({ focus }) => {
	const inputRef = useRef();
	
	const { register } = useFormContext();
	const { ref, ...rest } = register(
		REGISTER_INPUTS.username, 
		{ 
			validate: { 
				regexValidation: regexValidation(getRegexErrorsForUsernameValidation)
			}
		} 
	); 

	useEffect(() => { 
		if(focus) { 
			inputRef?.current.focus();
		}
	}, []); // eslint-disable-line

 	return (
		<React.Fragment> 
			<input 
				className=''
				placeholder={
					appIsAtRegisterURL 
						? 
							'Придумайте логин для входа' 
						: 
							'Логин' 
				} 
				{ ...rest }
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<NotifyingTip />
		</React.Fragment>

	)

}