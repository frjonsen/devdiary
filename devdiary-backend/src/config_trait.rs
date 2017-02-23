use super::config::{Config,Value};
use std::collections::HashMap;

pub struct DefaultConfig {
    internal_config: Config
}

impl DefaultConfig {
    pub fn new(conf: Config) -> DefaultConfig {
        DefaultConfig {
            internal_config: conf
        }
    }

    pub fn get_str_or_default(&self, key: &str, default: &str) -> String {
        match self.internal_config.get_str(key) {
            Some(value) => value,
            None => default.to_owned()
        }
    }

    pub fn get_int_or_default(&self, key: &str, default: i64) -> i64 {
        match self.internal_config.get_int(key) {
            Some(value) => value,
            None => default
        }
    }

    pub fn get_float_or_default(&self, key: &str, default: f64) -> f64 {
        match self.internal_config.get_float(key) {
            Some(value) => value,
            None => default
        }
    }

    pub fn get_bool_or_default(&self, key: &str, default: bool) -> bool {
        match self.internal_config.get_bool(key) {
            Some(value) => value,
            None => default
        }
    }

    pub fn get(&self, key_path: &str) -> Option<Value> {
        self.internal_config.get(key_path)
    }

    pub fn get_str(&self, key: &str) -> Option<String> {
        self.internal_config.get_str(key)
    }

    pub fn get_int(&self, key: &str)  -> Option<i64> {
        self.internal_config.get_int(key)
    }

    pub fn get_float(&self, key: &str) -> Option<f64> {
        self.internal_config.get_float(key)
    }

    pub fn get_bool(&self, key: &str) -> Option<bool> {
        self.internal_config.get_bool(key)
    }

    pub fn get_table(&self, key: &str) -> Option<HashMap<String, Value>> {
        self.internal_config.get_table(key)
    }

    pub fn get_array(self, key: &str) -> Option<Vec<Value>> {
        self.internal_config.get_array(key)
    }
}