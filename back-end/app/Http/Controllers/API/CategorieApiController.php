<?php

namespace App\Http\Controllers\API;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Http\Request;
use App\Models\Categorie;

use Illuminate\Routing\Controller as BaseController;

class CategorieApiController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $model;

    public function __construct(Categorie $categorie, Request $request)
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

        return response()->json($data, 201);
    }


    public function show($id)
    {
        if (!$data = $this->model->find($id)) {
            return response()->json([
                'error'=>'Nenhuma informação encontrado'
            ], 404);
        } else {
            return response()->json($data, 201);
        }
    }


    public function update($id)
    {   
        if (!$data = $this->model->find($id))
            return response()->json(['error'=>'Registro inválido'], 404);

        $this->validate($this->request, $this->model->rules());

        $dataForm = $this->request->all();

        $data->update($dataForm);

        return response()->json($data);
    }


    public function destroy($id)
    {
        if ($data = $this->model->find($id)) {
            $data->delete();
            
            return response()->json(['success' => 'Deletado com sucesso']);
        } else {
            return response()->json(['error'=>''], 404); 
        }
    }
}
