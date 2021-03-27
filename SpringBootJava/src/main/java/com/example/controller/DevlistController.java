package com.example.controller;

/**
 * @author Tu
 * @Package com.example.controller
 * @date 2021/3/26 15:37
 */

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.common.lang.Result;
import com.example.entity.Devlist;
import com.example.service.DevlistService;
import com.zaxxer.hikari.util.SuspendResumeLock;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@RestController

public class DevlistController {
    @Autowired
    DevlistService devlistService;

    @GetMapping("/getlist")
    public Result getlist() {
        return Result.succ("ok!");
    }

    @PostMapping("/save")
    public Result savedata(@RequestBody Devlist devlist) {
        Devlist dd = null;
        dd = new Devlist();
        dd.setCreated(LocalDateTime.now());
//        dd.setId(ShiroUtil.getProfile().getId());
        BeanUtil.copyProperties(devlist, dd, "created");
        devlistService.saveOrUpdate(dd);
        return Result.succ("保存成功！");
    }

    /**
     * [java.util.List<com.example.entity.Devlist>]
     *
     * @return com.example.common.lang.Result
     * @author Tu
     * @date 2021/3/27 10:32
     * @message 批量插入
     * List<Devlist> devlist 接收前端对象数组
     * 实现循环插入
     */
    @PostMapping("/savelist")
    public Result savelist(@RequestBody List<Devlist> devlist) {
        Devlist dd = null;
        dd = new Devlist();
        List<Devlist> entityList = new ArrayList<>(devlist);

//        System.out.println(devlist);
//        System.out.println(devlist.size());
//        System.out.println(entityList.size());
        for (int i = 0; i < entityList.size(); i++) {
// System.out.println(entityList.get(i));
            dd.setCreated(LocalDateTime.now());
//            BeanUtil.copyProperties(entityList.get(i), dd );
            BeanUtil.copyProperties(entityList.get(i), dd, "created");


            devlistService.saveOrUpdate(dd);
//            System.out.println(dd);
//            System.out.println(entityList);
        }
//        boolean d = devlistService.saveBatch(entityList); //先注销到
//        System.out.println(d);
//        System.out.println(dd);
//        System.out.println(entityList);
        return Result.succ("批量插入成功", null);
    }

    @GetMapping("/getdevlists")
    public Result getdevlists(Integer currentPage) {
        if (currentPage == null || currentPage < 1) {
            currentPage = 1;
        }
        Page page = new Page(currentPage, 5);
        QueryWrapper<Devlist> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("created");
        IPage pageData = devlistService.page(page, queryWrapper);

        return Result.succ("操作成功！", pageData);
    }

/**
 * [java.lang.String, java.lang.Integer]
 * @author Tu
 * @date 2021/3/27 16:05
 * @message 模糊查询功能
 * @return com.example.common.lang.Result
 */
    @GetMapping("/devquery")
    public Result devquery(String deviceid, Integer currentPage) {
        if (currentPage == null || currentPage < 1) {
            currentPage = 1;
        }
        Page page = new Page(currentPage, 5);
        QueryWrapper<Devlist> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("created");
        queryWrapper.like("deviceid", deviceid);


        IPage pageData = devlistService.page(page, queryWrapper);


        return Result.succ("查询成功",pageData);
    }
}
