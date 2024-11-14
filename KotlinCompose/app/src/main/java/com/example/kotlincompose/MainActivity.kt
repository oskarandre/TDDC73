package com.example.kotlincompose


import androidx.activity.enableEdgeToEdge
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.unit.sp



class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Column(horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Top){
                NavBar()
                Spacer(modifier = Modifier.height(32.dp))
                Images()
                Spacer(modifier = Modifier.height(48.dp))
                Buttons()
                Spacer(modifier = Modifier.height(32.dp))
                TextInputs()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NavBar(){
    //NavigationBar { Text("Example 2: Kotlin Compose")
    TopAppBar(
        title = { Text("Example 2: Kotlin Compose") },
        colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF00C853))
    )
}


@Composable
fun Buttons(){
    Column {
        Row { Button(onClick = { /*TODO*/ }, colors = ButtonDefaults.buttonColors(containerColor = Color(0xDDD6D7D7))) { Text("Button", fontSize = 15.sp, color = Color.Black)}
            Spacer(modifier = Modifier.width(64.dp))
            Button(onClick = { /*TODO*/ }, colors = ButtonDefaults.buttonColors(containerColor = Color(0xDDD6D7D7))) { Text("Button", fontSize = 15.sp, color = Color.Black)}
        }
        Spacer(modifier = Modifier.height(16.dp))
        Row { Button(onClick = { /*TODO*/ }, colors = ButtonDefaults.buttonColors(containerColor = Color(0xDDD6D7D7))) { Text("Button", fontSize = 15.sp, color = Color.Black)}
            Spacer(modifier = Modifier.width(64.dp))
            Button(onClick = { /*TODO*/ }, colors = ButtonDefaults.buttonColors(containerColor = Color(0xDDD6D7D7))) { Text("Button", fontSize = 15.sp, color = Color.Black)}
        }
    }
}

@Composable
fun Images(){
    val imageModifier = Modifier
        .size(150.dp)
    Image(
        painter = painterResource(id = R.drawable.circle),
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = imageModifier)
}

@Composable
fun TextInputs(){
    val text = remember { mutableStateOf("") }
    Row(verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Start){
        Text("Email:", modifier = Modifier.padding(8.dp), fontSize = 15.sp)
        Spacer(modifier = Modifier.width(34.dp))
        TextField(value = text.value, onValueChange = { text.value = it }, modifier = Modifier.width(250.dp).height(50.dp), colors = OutlinedTextFieldDefaults.colors( unfocusedContainerColor = Color.White)
        )

    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {

}