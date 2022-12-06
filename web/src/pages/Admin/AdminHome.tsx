import {Paper} from "@mui/material";
import {Newspaper, School, Science} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

interface BigButtonProps {
    label: string;
    icon: any;
    onClick: () => void;
}
const BigButton = (props: BigButtonProps) => {

    return (
        <div onClick={props.onClick} className='hover-btn'>
            <Paper elevation={4} style={{ margin: 20, width: '200px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <props.icon sx={{ fontSize: 100 }}/>
                <span style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10, textAlign: 'center' }}>{props.label}</span>
            </Paper>
        </div>
    )
}

interface AdminHomeProps {

}

export const AdminHome = (props: AdminHomeProps) => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>
            <BigButton label='Editions' icon={Newspaper} onClick={() => navigate('/admin/editions')}/>
            <BigButton label='Evaluateurs' icon={School} onClick={() => navigate('/admin/evaluateurs')}/>
            <BigButton label='Comités scientifiques' icon={Science} onClick={() => navigate('/admin/comites')}/>
        </div>
    )

}