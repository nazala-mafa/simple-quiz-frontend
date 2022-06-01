import { connect } from "react-redux";
import { deactivateToast } from "../../config/redux/action";

const reduxState = state => ({
  message :   state.message,
  error   :   state.error,
  errors  :   state.errors
})

const reduxDispatch = dispatch => ({
  closeToast: data => dispatch( deactivateToast(data) )
})

export default connect(reduxState, reduxDispatch)(function MessageBlock(props){
  let main_class = 'toast align-items-center text-white border-0 mb-3 w-100'
  let message_class = main_class + " bg-primary " + ( (props.message.show)? 'show': '' );
  let error_class = main_class + " bg-danger " + ( (props.error.show)? 'show': '' );
  let errors_class = main_class + " bg-danger " + ( (props.errors.show)? 'show': '' );
  let errors = []
  Object.entries(props.errors.text).map(x=>{
    errors.push(x[1])
    errors.push(<br/>)
    return null
  })
  return (
    <>
      <div className={message_class} role="alert">
        <div className="d-flex">
          <div className="toast-body">
            {props.message.text}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => props.closeToast('message')}></button>
        </div>
      </div>
      <div className={error_class} role="alert">
        <div className="d-flex">
          <div className="toast-body">
            {props.error.text}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => props.closeToast('error')}></button>
        </div>
      </div>
      <div className={errors_class} role="alert">
        <div className="d-flex">
          <div className="toast-body">
            { errors }
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => props.closeToast('errors')}></button>
        </div>
      </div>
    </>
  )
})