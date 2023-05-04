import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Protected = (props) =>{
	const {Component} = props;
	const navigate = useNavigate();
	useEffect(()=>{
		const token = localStorage.getItem("token");
		if(!token){
			navigate('/businesslogin');
		}
	})
	return(
	<>
	<Component />
	</>
	)
}
export default Protected;