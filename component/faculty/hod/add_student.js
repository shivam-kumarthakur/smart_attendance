import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView ,ImageBackground, ToastAndroid} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { Button,TextInput} from 'react-native-paper';
import { BackHandler } from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';
import AsyncStorage  from "@react-native-community/async-storage";  
import NetworkUtils from '../../../NetworkUtils';

export class add_student extends Component {
    state={
        branch_id:"",
        sem_id:"",
        name:"",
        enrollment_no:"",
        father_name:"",
        branch_name:"",
        student_age:"",
        progress_visible:false,
        mobile:"",
        gender:""

    }
   
    componentDidMount(){
        this.get_data()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    
    }
    handleBackButtonClick= async ()=> {
        //   console.log("type"+this.state.type)
        this.props.navigation.replace("dashboard_fc");
    
            return true;
          }
  async onPress_continue(){
            var hod_id=  await  AsyncStorage.getItem("hod_id");
            var tag=Number( this.state.branch_id);
                console.log(tag)
              if(tag==1||tag==2){
                  console.log(typeof(tag))
                  tag="MIT_Student_info"
        
              }else{
                  tag="MITS_Student_info"
        
              }
            
              const isConnected = await NetworkUtils.isNetworkAvailable();
              if(isConnected){

                if(this.state.sem_id.trim().length==0){
                    alert("Please Select Semester")
                }else if(this.state.name.trim().length==0){
                    alert("Please Enter Student Name")
                }else if(this.state.student_age.trim().length==0){
                    alert("Please Enter Student Age")
                }else if(this.state.father_name.trim().length==0){
                    alert("Please Enter Father Name")
                }else if(this.state.gender.trim().length==0){
                    alert("Please Select Gender")
                }
                else if(this.state.enrollment_no.trim().length==0){
                    alert("Please Enter enrollment no")
                }else if(this.state.mobile.trim().length==0){
                    alert("Please Enter student Mobile number ");
                }else if(this.state.mobile.trim().length!=10||isNaN(this.state.mobile.trim()) || Number(this.state.mobile.trim())<0 ){
                    alert("Please Enter correct mobile number ");
                }else{

            
                          this.setState(
                              {
                                  progress_visible:true
                              }
                          )
                         
                          // alert(this.state.sem_id+" "+this.state.branch_id)
                          var   insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/add_new_student.php";
              
                          var header={
                              'Accept':'application/json',
                              'Content-Type':'application/json'
                            };
                     fetch(insertAPIURL,{
                         method:'POST',
                         headers:header,
                         body:JSON.stringify({
                          hod_id:hod_id,
                          branch_id:this.state.branch_id,
                          sem_id:this.state.sem_id,
                          name:this.state.name,
                          age:this.state.student_age,
                          father_name:this.state.father_name,
                          gender:this.state.gender,
                          enrollment_no:this.state.enrollment_no,
                          mobile:this.state.mobile,
                          type:"1",
                          from_where:tag
                         })
                     }  
                     ).then((response)=>response.json())
                     .then((response)=>{
                      //   response.attendance_s tatus="";
                      console.log(response)
               
                             
                      if(response!=null||response.length!=0){
                        if(response[0].mess=="s"){
                            console.log("hii")
                            alert("successfull")
        
                            setTimeout(()=>{ this.props.navigation.replace('dashboard_fc')    }, 1000);
        
                        }else{
                         // console.log("hii2")
        
                         alert("no successfull")
        
                        }
                         
                    }
                         
                        this.setState(
                          {
                              progress_visible:false,
                              
                          }
                      )
              
                     }).catch((error)=>{
                         console.log("error from total survey:"+error);
                         this.setState(
                          {
                              progress_visible:false
                          }
                      )
                     })
                        
                      
                    }
              }else{
                  ToastAndroid.show("Internet is required")
              }
             }
    componentWillUnmount() {
        // this.setState({
            
        //     branch_id:"",
        //     sem_id:"",
        //     sem_view_visble:"none",
        //     progress_visible:false
    
        // })
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    async    get_data(){
        this.setState({
            branch_id: await AsyncStorage.getItem("branch_id"),
            branch_name:  await AsyncStorage.getItem("branch_name")
            
        })
      
        }
    render() {
        return (
            <ImageBackground
            style={styles.container}
            source={require("../../../images/bg1.jpg")}
            >
                <ProgressDialog visible={this.state.progress_visible} />
                <ScrollView>
                <Card
                style={styles.all_picker}
                >
                    
                    <Text
                   style= {styles.indicate}
                    >Select Branch</Text>
                    <View
                    style={styles.picker_view}
                    >
                    <Picker
                    selectedValue={this.state.branch_id}
                    style={styles.state_picker} 
                    itemStyle={styles.it}
                    onValueChange={(itemVale)=>{this.setState({branch_id:itemVale})}}
                  >

                  <Picker.Item label={this.state.branch_name} value={this.state.branch_name}  color="green"/>
              
                         
                    </Picker>
                    </View>
                    <View
                   
                    >
                    <Text
                 style={styles.indicate}
                > Select Semester</Text>
                <View
                      style={styles.picker_view}
                >
                    <Picker
                    selectedValue={this.state.sem_id}
                    style={styles.state_picker}
                    itemStyle={styles.it}
                    onValueChange={(itemVale)=>{this.setState({sem_id:itemVale})}}

                    >
                       <Picker.Item label="Select Semester" value=""  color="white"/>
                       <Picker.Item label="First" value="1" color="green" />
                       <Picker.Item label="Second" value="2"  color="green"/>
                       <Picker.Item label="Third" value="3" color="green" />
                       <Picker.Item label="Fourth" value="4"color="green" />
                       <Picker.Item label="Five" value="5" color="green" />
                       <Picker.Item label="six" value="6" color="green" />
                       <Picker.Item label="Seven " value="7" color="green" />
                       <Picker.Item label="eight" value="8" color="green" />
                      
                    </Picker>
                    </View>
                  
                    <TextInput
                     label="Enter Student Name"
                     mode="flat"
                     underlineColor="transparent" 
                     theme={{roundness: 10,colors: { primary: 'white',underlineColor:'#136a8a',text:"green"}}}
                     style={styles.TextInput}   
                    value={this.state.name}
                
                     onChangeText={text => this.setState({name:text})}
                     />
                    <TextInput
                     label="Enter Student Age"
                     mode="flat"
                     maxLength={2}
                     underlineColor="transparent" 
                     theme={{roundness: 10,colors: { primary: 'white',underlineColor:'#136a8a',text:"green"}}}
                     style={styles.TextInput}   
                    value={this.state.student_age}
                     keyboardType="phone-pad"
                     onChangeText={text => this.setState({student_age:text})}
                     />
                       <TextInput
                     label="Enter Student's Father Name"
                     mode="flat"
                     underlineColor="transparent" 
                     theme={{roundness: 10,colors: { primary: 'white',underlineColor:'#136a8a',text:"green"}}}
                     style={styles.TextInput}   
                    value={this.state.father_name}
                     onChangeText={text => this.setState({father_name:text})}
                     />
                      <Text
                   style= {styles.indicate}
                    >Select Gender</Text>
                    <View
                    style={styles.picker_view}
                    >
                    <Picker
                    selectedValue={this.state.gender}
                    style={styles.state_picker} 
                    itemStyle={styles.it}
                    onValueChange={(itemVale)=>{this.setState({gender:itemVale})}}
                  >

                  <Picker.Item label="Select Gender" value=""  color="black"/>
                  <Picker.Item label="Male" value="1"  color="green"/>
                  <Picker.Item label="Female" value="2"  color="green"/>
                  <Picker.Item label="Other" value="3"  color="green"/>
              
                         
                    </Picker>
                    </View>
                       <TextInput
                     label="Enter Student's Enrollment No"
                     mode="flat"
                     underlineColor="transparent" 
                     theme={{roundness: 10,colors: { primary: 'white',underlineColor:'#136a8a',text:"green"}}}
                     style={styles.TextInput}   
                    value={this.state.enrollment_no}
                     onChangeText={text => this.setState({enrollment_no:text})}
                     />
                       <TextInput
                     label="Enter Student Mobile Number"
                     mode="flat"
                     maxLength={10}
                     underlineColor="transparent" 
                     theme={{roundness: 10,colors: { primary: 'white',underlineColor:'#136a8a',text:"green"}}}
                     style={styles.TextInput}   
                    value={this.state.mobile}
                     keyboardType="phone-pad"
                     onChangeText={text => this.setState({mobile:text})}
                     />
                    </View>
                
                  
                
                    <Button 
                    onPress={()=>{
                        this.onPress_continue();
                    }}
                    mode="contained"
                    labelStyle={{
                        color:'white',
                        fontSize:16
                    }}
                    style={
                        {
                            width:150,
                            alignSelf:'center',
                            marginTop:"10%",
                            borderRadius:15,
                            backgroundColor:"#bc5100",
                            height:40
                        }
                    }
                    >
                     Continue
                    </Button>
                </Card>
                </ScrollView>

            </ImageBackground>
        )
    }
}
const styles=StyleSheet.create(
    {
        state_picker:{
            //  width:100,
           
            height:50,
            borderWidth:5,
            borderColor:'#0adeef',
            // color:'white'
        },
        indicate:{
                        fontSize:18,
                        fontWeight:'bold',
                       color:'white',
                    marginTop:10,
                   
                },
         container:{
             height:'100%',
             width:"100%",
            //  alignItems:'center'
         },
        
         all_picker:{
             padding:30,
             marginTop:"5%",
             alignSelf:'center',
             backgroundColor:'rgba(52, 52, 52, 0.8)',
             borderRadius:30,
             width:"95%",
             margin:15,
             
         } ,
       
         picker_view:{
            borderColor:"#136a8a",
            borderWidth:2,
            borderRadius:10,
              backgroundColor:"rgba(52, 52, 52, 0.8)",
              marginTop:10
         },
        
         
       
      
      
        it:{
            paddingLeft:40,
              fontSize:16,
              fontWeight:'bold',
        },TextInput:{
            borderColor:"#136a8a",
            borderWidth:2,
            marginTop:10,
            height:50,
            fontSize:16,
            // borderBottomEndRadius:10,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            // borderColor:"red",
            backgroundColor:"rgba(52, 52, 52, 0.8)",
            paddingLeft:20,
            // textTransform:""
            textTransform: "uppercase",
            color:"white"
    
        }

    }
)
export default add_student
