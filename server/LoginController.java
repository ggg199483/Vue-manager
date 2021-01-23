package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by tim on 2021/1/18
 **/
@RestController
public class LoginController {

    private static Map userMap = new HashMap();

    @PostMapping("/login/loginbyemail")
    public String loginByemail(@RequestBody String body){
        System.out.println("body:"+body);
        System.out.println("login!");
        Map resultMap = new HashMap<>();
        resultMap.put("code",200);
        resultMap.put("msg","success");
        Role role = new Role();
        role.setRole(Arrays.asList("admin"));
        String uuid = UUID.randomUUID().toString();
        System.out.println("生成uuid:"+uuid);
        role.setToken(uuid);
        role.setIntroduction("guanliyuan");
        role.setName(" super admin");
        role.setUid("001");
        userMap.put(uuid,role);
        return JSONObject.toJSONString(role);
    }


    @GetMapping("/user/info")
    public String userInfo(@RequestParam("token")String token){

        System.out.println("userInfo!");
        System.out.println("token:"+token);
        Object user = userMap.get(token);
        return JSONObject.toJSONString(user);

//        Map resultMap = new HashMap<>();
//        resultMap.put("code",200);
//        resultMap.put("msg","success");
//        Role role = new Role();
//        role.setRole(Arrays.asList("admin"));
//        String uuid = UUID.randomUUID().toString();
//        System.out.println("生成uuid:"+uuid);
//        role.setToken(uuid);
//        role.setIntroduction("guanliyuan");
//        role.setName(" super admin");
//        role.setUid("001");
//        userMap.put(uuid,role);
//        return JSONObject.toJSONString(role);
    }


    class Role{
        private List<String> role;

        private String token;

        private String introduction;

        private String name;

        private String uid;

        public List<String> getRole() {
            return role;
        }

        public void setRole(List<String> role) {
            this.role = role;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getIntroduction() {
            return introduction;
        }

        public void setIntroduction(String introduction) {
            this.introduction = introduction;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
        }
    }
}
