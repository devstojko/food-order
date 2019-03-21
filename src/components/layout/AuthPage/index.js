import React from 'react';
import serbia from '@images/serbia.svg';
import uk from '@images/uk.svg';
import { useTranslation } from 'react-i18next';

import './_AuthPage.scss';

const AuthPage = ({ left = null, right = null }) => {
	const { i18n } = useTranslation();

	const changeLanguage = lng => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className="auth-container">
			{left !== null ? (
				<React.Fragment>
					<div className="auth-right-side">{left}</div>
					<div className="auth-left-side bg-side" />
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="auth-left-side bg-side" />
					<div className="auth-right-side">
						<div className="flags-auth-page">
							<a
								onClick={() => changeLanguage('rs')}
								className="right-side-nav__link">
								<img src={serbia} style={{ width: '40px', height: '30px' }} />
							</a>{' '}
							<a
								onClick={() => changeLanguage('en')}
								className="right-side-nav__link">
								<img src={uk} style={{ width: '40px', height: '30px' }} />
							</a>
						</div>
						{right}
					</div>
				</React.Fragment>
			)}
		</div>
	);
};
export default AuthPage;
