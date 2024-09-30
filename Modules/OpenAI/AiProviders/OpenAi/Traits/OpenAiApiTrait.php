<?php

namespace Modules\OpenAI\AiProviders\OpenAi\Traits;

trait OpenAiApiTrait
{
     public function aiKey()
     {
        return apiKey('openai');
     }
 
     public function client()
     {
         return \OpenAI::client($this->aiKey());
     }
 
     public function chat()
     {
         return $this->client()->chat()->create($this->processedData);
     }
 
     public function chatStream()
     {
         return $this->client()->chat()->createStreamed($this->processedData);
     }
}