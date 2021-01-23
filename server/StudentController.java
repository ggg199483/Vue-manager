package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.sun.deploy.net.HttpResponse;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by tim on 2021/1/11
 **/
@RestController
@RequestMapping("/student")
public class StudentController {

    @GetMapping("/test")
    public String test(HttpServletResponse response, HttpServletRequest request){
        Enumeration<String> headerNames = request.getHeaderNames();

        String type = request.getHeader("type");
        String token = request.getHeader("token");
        System.out.println("type:"+type);
        System.out.println("token:"+token);
        Cookie cookie = new Cookie("token","adkjh");
        response.addCookie(cookie);
        return "success";
    }


    @PostMapping("/register")
    public String test(@RequestBody  String  body){
        System.out.println("body"+body);
        Map resultMap = new HashMap();
        resultMap.put("code",200);
        resultMap.put("data","success");
        return JSONObject.toJSONString(resultMap);
    }
}
