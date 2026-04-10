import { FieldSection } from "./FieldSection";
import { HeaderLinks } from "./HeaderLinks";
import { HeaderProfile } from "./HeaderProfile";

export function Header() {
	return <header className='p-5 border-b border-border'>
		<div className="flex items-center justify-between">
			<FieldSection/>
			<div className=" flex items-center gap-7">

			<HeaderLinks/>

			<HeaderProfile/>
			</div>
		</div>
	</header>
}
