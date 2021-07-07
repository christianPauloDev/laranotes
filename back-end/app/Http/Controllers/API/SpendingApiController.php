<?php

namespace App\Http\Controllers\API;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Http\Request;
use App\Models\Spending;
use Illuminate\Support\Facades\DB;

use Illuminate\Routing\Controller as BaseController;

class SpendingApiController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $model;

    public function __construct(Spending $categorie, Request $request)
    {
        $this->model = $categorie;
        $this->request = $request;
    }
    
    public function index()
    {
        $data = $this->model->all();

        return response()->json($data);
    }


    public function store()
    {
        $this->validate($this->request, $this->model->rules());

        $dataForm = $this->request->all();

        $data = $this->model->create($dataForm);

        return response()->json($data, 200);
    }

    public function update($id)
    {   
        if (!$data = $this->model->find($id))
            return response()->json(['error'=>'Consulta inválida'], 404);

        $this->validate($this->request, $this->model->rules());

        $dataForm = $this->request->all();

        $data->update($dataForm);

        return response()->json($data);
    }

}
