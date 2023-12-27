import styled from 'styled-components';

export const Wrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 700;
	width: inherit;
	outline: 0;

	@media only screen and ( max-width:633px){
		width:500px !important;
	}

	@media only screen and ( max-width:542px){
		width:100% !important;
	}
	@media only screen and ( max-width:456px){
		width:100% !important;
	}
	@media only screen and ( max-width:360px){
		width:fit-content !important;
	}
	@media only screen and ( max-width:266px){
		width:fit-content !important;
	}
`;

export const Backdrop = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 500;
`;

export const StyledModal = styled.div`
	z-index: 100;
	background: white;
	position: relative;
	margin: auto;
	border-radius: 8px;
	width:100%;

	@media only screen and ( max-width:633px){
		width:500px !important;

	}

	@media only screen and ( max-width:542px){
		width:450px !important;
	}

	@media only screen and ( max-width:456px){
		width:90% !important;
	}

	@media only screen and ( max-width:360px){
		width:250px !important;
	}
	@media only screen and ( max-width:266px){
		width:150px !important;
	}
`;

export const Header = styled.div`
	border-radius: 8px 8px 0 0;
	display: flex;
	justify-content: space-between;
	padding: 0.3rem;
`;

export const HeaderText = styled.div`
	color: #fff;
	align-self: center;
	color: lightgray;
`;

export const CloseButton = styled.button`
	font-size: 0.8rem;
	border: none;
	border-radius: 3px;
	margin-left: 0.5rem;
	background: none;
	:hover {
		cursor: pointer;
	}

	
`;

export const Content = styled.div`
	padding-left:15%;
	padding-right:15%;
	max-height: 30rem;
	width:500px;
	overflow-x: hidden;
	overflow-y: auto;

	@media only screen and ( max-width:633px){

		width:500px;
	}

	@media only screen and ( max-width:575px){
		padding-left:5%;
		padding-right:5%;

		
	}

	@media only screen and ( max-width:542px){
		width:100% !important;

		
	}

	@media only screen and ( max-width:456px){
		width:100% !important;
		
	}

	@media only screen and ( max-width:360px){
		padding-left:3% !important;
		padding-right:3% !important;
	}

	@media only screen and ( max-width:266px){
		padding-left:2% !important;
		padding-right:2% !important;
	}

`;

