<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index() {
        $company_info = $this->httpGetJson(C('API_URL') . 'setting/setting/info');
        $this->assign('company_info', $company_info);

        $all_banner = $this->httpGetJson(C('API_URL') . 'module/banner/list&code=index-banner');
        $banner = array_slice($all_banner,0,3);
        $partners_logo = array_slice($all_banner,3,7);
        $about_1 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=1');
        $about_2 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=4');
        $about_3 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=3');
        $technical_intro = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=5');
        $teams = $this->httpGetJson(C('API_URL') . 'information/information/list&code=team');
        $team = array();
        foreach ($teams as $key => $val) {
            $arr = array();
            $arr = explode(' - ', $val['title']);
            $arr[] = $val['description'];
            $arr[] = $val['information_id'];
            $arr[] = $val['image'];
            $team[] = $arr; 
        }
        $partners = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=16');
        $corporate_vision = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=6');
        $contact = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=7');
        $company_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=0&pagesize=6&filter_article_category_id=1');


        $this->assign('banner', $banner);
        $this->assign('partners_logo', $partners_logo);
        $this->assign('about_1', $about_1);
        $this->assign('about_2', $about_2);
        $this->assign('about_3', $about_3);
        $this->assign('technical_intro', $technical_intro);
        $this->assign('teams', $teams);
        $this->assign('team', $team);
        $this->assign('partners', $partners);
        $this->assign('corporate_vision', $corporate_vision);
        $this->assign('contact', $contact);
        $this->assign('company_news', $company_news);

        $this->display();
    }

    public function about() {
        $data = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=7');        
        $company_culture = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=7&filter_article_category_id=3');
        $data_detail = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=3');
        $this->assign('data', $data);
        $this->assign('company_culture', $company_culture);
        $this->assign('data_detail', $data_detail);
        
    	$this->display();
    }

    public function team() {
        $brief = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=8');
        $data = $this->httpGetJson(C('API_URL') . 'information/information/list&code=team');
        $this->assign('brief', $brief);
        $this->assign('data', $data);
        
        $this->display();
    }

    public function news() {
        $company_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=7&filter_article_category_id=1');
        $industry_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=7&filter_article_category_id=2');
        $this->assign('company_news', $company_news);
        $this->assign('industry_news', $industry_news);
        
        $this->display();
    }

    public function news_detail() {
        $id = $_GET['id'];
        $data = $this->httpGetJson(C('API_URL') . 'catalog/article/detail&id=' . $id);
        $data['description'] = html_entity_decode($data['description'], ENT_QUOTES, 'UTF-8');
        $this->assign('data', $data);

        $industry_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=6&filter_article_category_id=2');
        $company_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=7&filter_article_category_id=1');
        $this->assign('industry_news', $industry_news);
        $this->assign('company_news', $company_news);
        
        $this->display();
    }

    public function contact() {
        if (IS_POST) {
            if (!$_POST['email'] || !$_POST['name'] || !$_POST['subject'] || !$_POST['content']) {
                $this->assign('error', L('ERR_EMPTY'));
            } else {
                $data = $this->httpPost(C('API_URL') . 'information/feedback/submit', array(
                    'name' => $_POST['name'],
                    'email' => $_POST['email'],
                    'enquiry' => $_POST['subject'] . ' - ' . $_POST['content']));
                $this->assign('success', L('SUCCESS'));
            }
        }

        $info = $this->httpGetJson(C('API_URL') . 'setting/setting/info');

        if (LANG_SET == 'en-us') {
            $lang_id = 2;
        } else {
            $lang_id = 1;
        }

        if ($info && isset($info['config_address_' . $lang_id])) {
            $addr_arr = explode('##', $info['config_address_' . $lang_id]);
            $this->assign('addresses', $addr_arr);
        }

        $this->assign('company_email', $info['config_email']);

        $this->display();
    }

    private function httpGetJson($url) {
        if (LANG_SET == 'en-us') {
            $url .= '&language=en';
        } else {
            $url .= '&language=zh';
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result = curl_exec($ch);
        curl_close($ch);
        $arr = json_decode($result, ture);
        if ($arr['code'] == '0x0000') {
            return $arr['result'];
        } else {
            return array();
        }
    }

    private function httpPost($url, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        $result = curl_exec($ch);
        curl_close($ch);
        $arr = json_decode($result, ture);
        if ($arr['code'] == '0x0000') {
            return $arr['result'];
        } else {
            return array();
        }
    }

}