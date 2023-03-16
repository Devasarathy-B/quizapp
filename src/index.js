//import { render } from "@testing-library/react";
import React ,{Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService"
import Qbox from "./Components/Qbox";
import Result from "./Components/Result";

class Qizz extends Component{
    state = {
        qB:[],
        score:0,
        responses:0
    }
    getQuestions=()=>{
            quizService().then(question=>{
                this.setState({
                    qB:question
                })
            })
    }
    computeAnswer=(answers,correctAnswer)=>{
            if(answers===correctAnswer){
                this.setState({
                    score:this.state.score+1
                })
            }

            this.setState({
           responses: this.state.responses <5 ? this.state.responses +1:5
            })
    }
    playAgain = ()=>{
        this.getQuestions(); 
        this.setState({
            score:0,
            responses:0
        })
    }
    componentDidMount(){
        this.getQuestions()
    }
    render() {
        return (
            <div className='Container'>
                <div className='title'>Deva-QuizApp</div>
                {this.state.qB.length>0 && 
                this.state.responses<5 &&
                this.state.qB.map(
                    ({question, answers, correct, questionId})=><Qbox 
                    question={question}
                    options={answers}
                    key={questionId}
                    selected={answers=>this.computeAnswer(answers,correct)}/>
                    )
                }
                {this.state.responses===5 ?(<Result score={this.state.score} playAgain={this.playAgain}/>
                ):null}
            </div>
        );
    }
}

ReactDOM.render(<Qizz/> , document.getElementById("root")); 