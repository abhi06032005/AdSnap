import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import { Route, Routes } from 'react-router';
import Generator from './pages/Generator';
import Result from './pages/Result';
import MyGenerations from './pages/MyGenerations';
import Plans from './pages/Plans';
import Loading from './pages/Loading';
import Community from './pages/Community';

function App() {
	return (
		<>
		
			<SoftBackdrop />
			<LenisScroll />
			<Navbar />
			<Routes>
				<Route path='/' element = {	<Home /> }></Route>
				<Route path='/generate' element = {	<Generator /> }></Route>
				<Route path='/result:projectId' element = {	<Result /> }></Route>
				<Route path='/my-generations' element = {	<MyGenerations /> }></Route>
				<Route path='/plans' element = {	<Plans plans={[] as any} /> }></Route>
				<Route path='/loading' element = {	<Loading/> }></Route>
				<Route path='/community' element = {	<Community/> }></Route>
			</Routes>
		
			<Footer />
		</>
	);
}
export default App;