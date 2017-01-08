<?php
namespace CoreUI\Table;
use CoreUI\Handlers;
use CoreUI\Exception;
use CoreUI\Utils\Session\SessionNamespace;


/**
 * Class Handler
 * @package CoreUI
 */
class Handler extends Handlers {


    /**
     * @param  array $data
     * @throws Exception
     */
    protected function setStatus($data) {

        if ( ! $this->isValidRequest('table')) {
            throw new Exception('Not valid request');
        }

        $session = new SessionNamespace($this->resource);

        if (empty($data['rec_id'])) {
            throw new Exception('Record id empty');

        } elseif ( ! is_string($data['rec_id']) && ! is_numeric($data['rec_id'])) {
            throw new Exception('Record id not valid');

        } elseif (empty($data['new_value']) || ( ! is_string($data['new_value']) && ! is_int($data['new_value']))) {
            throw new Exception('Switched value not valid');

        } elseif (empty($session->access) || empty($session->access->change_status_field)) {
            throw new Exception('Switched field empty');
        }



        if (isset($session->db) && ! empty($session->db->table)) {
            $table = $session->db->table;
        } else {
            throw new Exception('Table not found');
        }

        $primary_key = ! empty($session->db->primary_id)
            ? $session->db->primary_id
            : 'id';

        $primary_key = $this->db->quoteIdentifier($primary_key);
        $where       = $this->db->quoteInto("{$primary_key} = ?", $data['rec_id']);
        $is_update   = $this->db->update($table, array(
            $session->access->change_status_field => $data['new_value']
        ), $where);

        if ( ! $is_update) {
            throw new Exception('Error update data');
        }
    }


    /**
     * @param  array $data
     * @throws Exception
     */
    protected function setSearch($data) {

        if ( ! $this->isValidRequest('table')) {
            throw new Exception('Not valid request');
        }

        $session = new SessionNamespace($this->resource);

        if (isset($data['search'])) {
            $session->table->search = $data['search'];
        }
    }


    /**
     * @param  array $data
     * @return bool
     * @throws Exception
     */
    protected function setRecordPerPage($data) {

        if ( ! $this->isValidRequest('table')) {
            throw new Exception('Not valid request');
        }

        $session = new SessionNamespace($this->resource);

        if (isset($data['records_per_page'])) {
            $session->table->records_per_page = (int)$data['records_per_page'];
        }
    }


    /**
     * @throws Exception
     */
    protected function setClearSearch() {

        if ( ! $this->isValidRequest('table')) {
            throw new Exception('Not valid request');
        }

        $session = new SessionNamespace($this->resource);
        $session->table->search = false;
    }


    /**
     * @param  array $data
     * @throws Exception
     */
    protected function setOrder($data) {

        if ( ! $this->isValidRequest('table')) {
            throw new Exception('Not valid request');
        }

        if (empty($data['column_number'])) {
            throw new Exception('Parameter column_number empty');
        }

        $session       = new SessionNamespace($this->resource);
        $column_number = (int)$data['column_number'];

        if (isset($session->table->order) && $column_number != $session->table->order) {
            $session->table->order_type = 'ASC';
            $session->table->order      = $column_number;

        } else {
            if (isset($session->table->order_type) && $session->table->order_type == 'ASC') {
                $session->table->order_type = 'DESC';
                $session->table->order      = $column_number;

            } elseif (isset($session->table->order_type) && $session->table->order_type == 'DESC') {
                unset($session->table->order);
                unset($session->table->order_type);

            } else {
                $session->table->order_type = 'ASC';
                $session->table->order      = $column_number;
            }
        }
    }


    /**
     * @param  array $data
     * @throws Exception
     */
    protected function deleteData($data) {

        if ( ! $this->isValidRequest('table')) {
            throw new Exception('Not valid request');
        }

        $session = new SessionNamespace($this->resource);

        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            throw new Exception('Invalid request method, need DELETE');

        } elseif (empty($data['id_rows']) || ! is_array($data['id_rows'])) {
            throw new Exception('Records id not valid');

        } elseif (empty($session->db) || empty($session->db->table)) {
            throw new Exception('No set table');

        } elseif (empty($session->access) || empty($session->access->delete) || ! $session->access->delete) {
            throw new Exception('Access denied');
        }

        $table = $session->db->table;
        $primary_key = ! empty($session->db->primary_id)
            ? $session->db->primary_id
            : 'id';

        $primary_key = $this->db->quoteIdentifier($primary_key);
        $where       = $this->db->quoteInto("{$primary_key} IN(?)", $data['id_rows']);
        $is_delete   = $this->db->delete($table, $where);

        if ( ! $is_delete) {
            throw new Exception('Error delete data');
        }
    }
}